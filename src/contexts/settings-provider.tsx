import { createContext, useContext, useEffect, useState } from "react";

type SettingsProviderProps = {
  children: React.ReactNode;
};

type SettingsProviderState = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  environment: Environment;
  setEnvironment: (environment: Environment) => void;
};

const defaultSettings: Settings = {
  local: {
    uri: "http://localhost:8080/v1/graphql",
    adminSecret: "myadminsecretkey",
    myUserEmail: "",
  },
  staging: {
    uri: "https://staging.workflow.com/v1/graphql",
    adminSecret: "myadminsecretkey",
    myUserEmail: "",
  },
  production: {
    uri: "https://production.workflow.com/v1/graphql",
    adminSecret: "myadminsecretkey",
    myUserEmail: "",
  },
};

export type EnvironmentConfig = {
  uri: string;
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
