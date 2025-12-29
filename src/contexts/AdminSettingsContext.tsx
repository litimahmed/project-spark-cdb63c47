import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeColor = 'gold' | 'burgundy' | 'champagne';
export type LayoutType = 'vertical' | 'horizontal';
export type ContainerType = 'boxed' | 'full';
export type SidebarType = 'full' | 'mini';
export type CardStyle = 'border' | 'shadow';
export type Direction = 'ltr' | 'rtl';

interface AdminSettings {
  themeColor: ThemeColor;
  direction: Direction;
  layoutType: LayoutType;
  containerType: ContainerType;
  sidebarType: SidebarType;
  cardStyle: CardStyle;
  borderRadius: number;
}

interface AdminSettingsContextType extends AdminSettings {
  setThemeColor: (color: ThemeColor) => void;
  setDirection: (dir: Direction) => void;
  setLayoutType: (layout: LayoutType) => void;
  setContainerType: (container: ContainerType) => void;
  setSidebarType: (sidebar: SidebarType) => void;
  setCardStyle: (style: CardStyle) => void;
  setBorderRadius: (radius: number) => void;
  resetSettings: () => void;
}

const defaultSettings: AdminSettings = {
  themeColor: 'gold',
  direction: 'ltr',
  layoutType: 'vertical',
  containerType: 'full',
  sidebarType: 'full',
  cardStyle: 'shadow',
  borderRadius: 8,
};

const STORAGE_KEY = 'admin-settings';

const AdminSettingsContext = createContext<AdminSettingsContextType | undefined>(undefined);

export const AdminSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AdminSettings>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Migrate old color values to new ones
          if (parsed.themeColor && !['gold', 'burgundy', 'champagne'].includes(parsed.themeColor)) {
            parsed.themeColor = 'gold';
          }
          return { ...defaultSettings, ...parsed };
        } catch {
          return defaultSettings;
        }
      }
    }
    return defaultSettings;
  });

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Apply border radius CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--radius', `${settings.borderRadius}px`);
  }, [settings.borderRadius]);

  const setThemeColor = (color: ThemeColor) => setSettings(prev => ({ ...prev, themeColor: color }));
  const setDirection = (dir: Direction) => setSettings(prev => ({ ...prev, direction: dir }));
  const setLayoutType = (layout: LayoutType) => setSettings(prev => ({ ...prev, layoutType: layout }));
  const setContainerType = (container: ContainerType) => setSettings(prev => ({ ...prev, containerType: container }));
  const setSidebarType = (sidebar: SidebarType) => setSettings(prev => ({ ...prev, sidebarType: sidebar }));
  const setCardStyle = (style: CardStyle) => setSettings(prev => ({ ...prev, cardStyle: style }));
  const setBorderRadius = (radius: number) => setSettings(prev => ({ ...prev, borderRadius: radius }));
  const resetSettings = () => setSettings(defaultSettings);

  return (
    <AdminSettingsContext.Provider
      value={{
        ...settings,
        setThemeColor,
        setDirection,
        setLayoutType,
        setContainerType,
        setSidebarType,
        setCardStyle,
        setBorderRadius,
        resetSettings,
      }}
    >
      {children}
    </AdminSettingsContext.Provider>
  );
};

export const useAdminSettings = () => {
  const context = useContext(AdminSettingsContext);
  if (!context) {
    throw new Error('useAdminSettings must be used within AdminSettingsProvider');
  }
  return context;
};
