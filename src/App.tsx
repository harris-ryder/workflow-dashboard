import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { Toaster } from "sonner";

import { useEffect, useState } from "react";
import Navbar from "./components/nav-bar";
import SearchUser from "./components/search-user/search-user";
import {
  type EnvironmentConfig,
  SettingsProvider,
  useSettings,
} from "./contexts/settings-provider";
import { ThemeProvider } from "./contexts/theme-provider";

const createApolloClient = (config: EnvironmentConfig) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: config.hasuraHttpUrl,
      headers: {
        "X-Hasura-Admin-Secret": config.adminSecret,
      },
    }),
    cache: new InMemoryCache(),
  });
};

function AppContent() {
  const { environmentConfig } = useSettings();
  const [client, setClient] = useState(() =>
    createApolloClient(environmentConfig)
  );

  useEffect(() => {
    setClient(createApolloClient(environmentConfig));
  }, [environmentConfig]);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
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
