import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useState } from "react";
import Navbar from "./components/nav-bar";
import SearchBar from "./components/search-bar";
import { TablesContainer } from "./components/tables-container.tsx/tables-container";
import { ThemeProvider } from "./contexts/theme-provider";

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
        <div className="w-screen h-screen">
          <Navbar />
          <SearchBar />
          <TablesContainer />
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
