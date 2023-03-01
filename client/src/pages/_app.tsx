import { theme } from "@/chakra/theme";
import { client } from "@/graphql/apolo-client";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, Toast } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App({
  Component,
  pageProps: { Session, ...pageProps },
}: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={Session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
          <ToastContainer/> 
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}