import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useState } from "react";
import Navbar from "./components/nav-bar";
import SearchBar from "./components/search-bar";
import { DataViewer } from "./components/data-viewer/data-viewer";
import { ThemeProvider } from "./contexts/theme-provider";
import { SettingsProvider } from "./contexts/settings-provider";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:8080/v1/graphql",
      headers: {
        "X-Hasura-Admin-Secret": "myadminsecretkey",
      },
    }),
    cache: new InMemoryCache(),
  });
};

function App() {
  const [client] = useState(createApolloClient());

  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SettingsProvider>
          <div className="w-screen h-screen">
            <Navbar />
            <SearchBar />
            <DataViewer />
          </div>
        </SettingsProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
