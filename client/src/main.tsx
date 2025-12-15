import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client"; // Import HttpLink directly
import App from "./App.tsx";
import "./index.css";
// import { ApolloProvider } from "@apollo/client/react"; // <--- Deep import

// 1. Create the link using the class constructor (Fixes deprecation)
const link = new HttpLink({
  uri: "http://localhost:3000/graphql",
});

// 2. Initialize Client
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 3. Provider should now work if install is clean */}
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
