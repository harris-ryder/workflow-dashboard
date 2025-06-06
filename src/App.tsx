import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { Toaster } from "sonner";

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
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
  const httpLink = createHttpLink({
    uri: config.hasuraHttpUrl,
    headers: {
      "X-Hasura-Admin-Secret": config.adminSecret,
    },
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: config.hasuraWsUrl,
      connectionParams: {
        headers: {
          "X-Hasura-Admin-Secret": config.adminSecret,
        },
      },
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    link: splitLink,
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
