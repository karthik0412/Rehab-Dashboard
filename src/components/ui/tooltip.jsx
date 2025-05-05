import * as Tooltip from "@radix-ui/react-tooltip";

export function TooltipProvider({ children }) {
  return (
    <Tooltip.Provider delayDuration={300}>
      {children}
    </Tooltip.Provider>
  );
}

export function CustomTooltip({ content, children }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        {children}
      </Tooltip.Trigger>
      <Tooltip.Content
        className="rounded-md bg-black text-white px-3 py-2 text-sm shadow-md"
        sideOffset={5}
      >
        {content}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
