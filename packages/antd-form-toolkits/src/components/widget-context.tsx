import React, { createContext, ReactNode, useState } from 'react';

interface WidgetContextProps {
  presets: Record<string, any>;
  widget: ReactNode;
  setWidget: (widget: ReactNode) => void;
}

export const WidgetContext = createContext<WidgetContextProps | undefined>(undefined);
export const WidgetProvider = ({ children }: { children: ReactNode }) => {
  const [widget, setWidget] = useState<ReactNode>();

  return (
    <WidgetContext.Provider
      value={{
        presets: {},
        widget,
        setWidget
      }}>
      {children}
    </WidgetContext.Provider>
  );
};
