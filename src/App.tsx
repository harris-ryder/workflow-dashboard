import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useEffect, useState } from "react";
import Navbar from "./components/nav-bar";
import {
  type EnvironmentConfig,
  SettingsProvider,
  useSettings,
} from "./contexts/settings-provider";
import { ThemeProvider } from "./contexts/theme-provider";
import SearchUser from "./components/search-user/search-user";

const createApolloClient = (config: EnvironmentConfig) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: config.uri,
      headers: {
        "X-Hasura-Admin-Secret": config.adminSecret,
      },
    }),
    cache: new InMemoryCache(),
  });
};

function AppContent() {
  const { environment, settings } = useSettings();
  const [client, setClient] = useState(() =>
    createApolloClient(settings[environment])
  );

  useEffect(() => {
    setClient(createApolloClient(settings[environment]));
  }, [environment, settings]);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="w-screen h-screen flex flex-col">
          <Navbar />
          <SearchUser />
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}

export default App;
