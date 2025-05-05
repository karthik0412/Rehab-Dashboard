import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { ref, onValue, off } from 'firebase/database';

export const useFirebaseData = () => {
  const [data, setData] = useState({
    flexion: null,
    force: null,
    mpu: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const listeners = [];
    
    try {
      // Flexion Data
      const flexionRef = ref(db, "SensorData/FlexSensor");
      const flexionListener = onValue(flexionRef, (snapshot) => {
        const rawData = snapshot.val() || {};
        const formattedFlexion = {
          thumb: Number(rawData.Flex1?.RawValue) || 0,
          index: Number(rawData.Flex2?.RawValue) || 0,
          middle: Number(rawData.Flex3?.RawValue) || 0,
          ring: Number(rawData.Flex4?.RawValue) || 0,
          pinky: Number(rawData.Flex5?.RawValue) || 0
        };
        
        setData(prev => ({
          ...prev,
          flexion: formattedFlexion,
          loading: false
        }));
      });
      listeners.push(flexionListener);

      // Force Sensor
      const forceRef = ref(db, "SensorData/ForceSensor");
      const forceListener = onValue(forceRef, (snapshot) => {
        const rawData = snapshot.val() || {};
        setData(prev => ({
          ...prev,
          force: Number(rawData.RawValue) || 0,
          loading: false
        }));
      });
      listeners.push(forceListener);

      // MPU Sensor
      const mpuRef = ref(db, "SensorData/MPU6058");
      const mpuListener = onValue(mpuRef, (snapshot) => {
        const rawData = snapshot.val() || {};
        setData(prev => ({
          ...prev,
          mpu: {
            accelX: Number(rawData.accelX) || 0,
            accelY: Number(rawData.accelY) || 0,
            accelZ: Number(rawData.accelZ) || 0,
            gyroX: Number(rawData.gyroX) || 0,
            gyroY: Number(rawData.gyroY) || 0,
            gyroZ: Number(rawData.gyroZ) || 0
          },
          loading: false
        }));
      });
      listeners.push(mpuListener);

    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to connect to database'
      }));
    }

    return () => listeners.forEach(ref => off(ref));
  }, []);

  return data;
};