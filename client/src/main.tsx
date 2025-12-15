import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context"; // New Import
import App from "./App.tsx";
import "./index.css";

// 1. Create the HTTP Link (Where the API lives)
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL || "http://localhost:3000/graphql",
});

// 2. Create the Auth Middleware (The "Token Stamper")
const authLink = setContext((_, { headers }) => {
  // Get the token from storage every time a request is made
  const token = localStorage.getItem("token");

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "", // Attach the token if it exists
    },
  };
});

// 3. Chain them together: Auth -> Http
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
