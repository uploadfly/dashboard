import AuthProvider from "@/provider/Auth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://cdn.uploadfly.cloud/xCnc4L/favicon-orange-mPuTin-huL.png"
        />
      </Head>
      <AuthProvider>
        <Toaster />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
