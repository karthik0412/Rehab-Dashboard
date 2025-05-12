// hooks/useFirebaseData.js
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { ref, onValue, off } from 'firebase/database';

export const useFirebaseData = () => {
  const [data, setData] = useState({
    flexion: null,
    force: null,
    mpu: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const listeners = [];

    try {
      // Flexion Listener
      const flexionRef = ref(db, 'SensorData/FlexSensor');
      const flexionListener = onValue(flexionRef, (snapshot) => {
        const rawData = snapshot.val() || {};
        const formattedFlexion = {
          thumb: Number(rawData.Flex1?.RawValue) || 0,
          index: Number(rawData.Flex2?.RawValue) || 0,
          middle: Number(rawData.Flex3?.RawValue) || 0,
          ring: Number(rawData.Flex4?.RawValue) || 0,
          pinky: Number(rawData.Flex5?.RawValue) || 0,
        };
        console.log('[Firebase] Flexion:', formattedFlexion);
        setData((prev) => ({ ...prev, flexion: formattedFlexion, loading: false }));
      });
      listeners.push({ ref: flexionRef, listener: flexionListener });

      // Force Sensor Listener
      const forceRef = ref(db, 'SensorData/ForceSensor');
      const forceListener = onValue(forceRef, (snapshot) => {
        const raw = snapshot.val() || {};
        const value = Number(raw.RawValue) || 0;
        console.log('[Firebase] Force:', value);
        setData((prev) => ({ ...prev, force: value, loading: false }));
      });
      listeners.push({ ref: forceRef, listener: forceListener });

      // MPU Listener
      const mpuRef = ref(db, 'SensorData/MPU6058');
      const mpuListener = onValue(mpuRef, (snapshot) => {
        const raw = snapshot.val() || {};
        const parsed = {
          accelX: Number(raw.accelX) || 0,
          accelY: Number(raw.accelY) || 0,
          accelZ: Number(raw.accelZ) || 0,
          gyroX: Number(raw.gyroX) || 0,
          gyroY: Number(raw.gyroY) || 0,
          gyroZ: Number(raw.gyroZ) || 0,
        };
        console.log('[Firebase] MPU:', parsed);
        setData((prev) => ({ ...prev, mpu: parsed, loading: false }));
      });
      listeners.push({ ref: mpuRef, listener: mpuListener });

    } catch (error) {
      console.error('[Firebase Error]', error);
      setData((prev) => ({ ...prev, loading: false, error: error.message || 'Failed to connect' }));
    }

    return () => {
      listeners.forEach(({ ref, listener }) => off(ref, 'value', listener));
    };
  }, []);

  return data;
};