import { createContext, useContext, useState } from "react";

type SettingsProviderProps = {
  children: React.ReactNode;
};

type SettingsProviderState = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  environment: Environment;
  environmentConfig: EnvironmentConfig;
  setEnvironment: (environment: Environment) => void;
};

const defaultSettings: Settings = {
  local: {
    webUrl: import.meta.env.VITE_LOCAL_WEB_URL || "",
    hasuraHttpUrl: import.meta.env.VITE_LOCAL_HASURA_HTTP_URL || "",
    hasuraWsUrl: import.meta.env.VITE_LOCAL_HASURA_WS_URL || "",
    adminSecret: import.meta.env.VITE_LOCAL_ADMIN_SECRET || "",
    myUserEmail: import.meta.env.VITE_LOCAL_MY_USER_EMAIL || "",
  },
  staging: {
    webUrl: import.meta.env.VITE_STAGING_WEB_URL || "",
    hasuraHttpUrl: import.meta.env.VITE_STAGING_HASURA_HTTP_URL || "",
    hasuraWsUrl: import.meta.env.VITE_STAGING_HASURA_WS_URL || "",
    adminSecret: import.meta.env.VITE_STAGING_ADMIN_SECRET || "",
    myUserEmail: import.meta.env.VITE_STAGING_MY_USER_EMAIL || "",
  },
  production: {
    webUrl: import.meta.env.VITE_PRODUCTION_WEB_URL || "",
    hasuraHttpUrl: import.meta.env.VITE_PRODUCTION_HASURA_HTTP_URL || "",
    hasuraWsUrl: import.meta.env.VITE_PRODUCTION_HASURA_WS_URL || "",
    adminSecret: import.meta.env.VITE_PRODUCTION_ADMIN_SECRET || "",
    myUserEmail: import.meta.env.VITE_PRODUCTION_MY_USER_EMAIL || "",
  },
};

export type EnvironmentConfig = {
  webUrl: string;
  hasuraHttpUrl: string;
  hasuraWsUrl: string;
  adminSecret: string;
  myUserEmail: string;
};

export type Settings = {
  local: EnvironmentConfig;
  staging: EnvironmentConfig;
  production: EnvironmentConfig;
};

export type Environment = keyof Settings;

const SettingsProviderContext = createContext<SettingsProviderState>({
  settings: defaultSettings,
  setSettings: () => null,
  environmentConfig: defaultSettings.local,
  environment: "local",
  setEnvironment: () => null,
});

export function SettingsProvider({
  children,
  ...props
}: SettingsProviderProps) {
  const [environment, setEnvironment] = useState<Environment>("local");
  const [settings, setSettings] = useState<Settings>(() =>
    JSON.parse(
      localStorage.getItem("settings") || JSON.stringify(defaultSettings)
    )
  );

  const value = {
    settings,
    setSettings: (settings: Settings) => {
      localStorage.setItem("settings", JSON.stringify(settings));
      setSettings(settings);
    },
    environmentConfig: settings[environment],
    environment,
    setEnvironment,
  };

  return (
    <SettingsProviderContext.Provider {...props} value={value}>
      {children}
    </SettingsProviderContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsProviderContext);

  if (context === undefined)
    throw new Error("useSettings must be used within a SettingsProvider");

  return context;
};
