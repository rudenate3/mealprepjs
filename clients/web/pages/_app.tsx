import { AppProps } from 'next/app'
import Head from 'next/head'

import Header from '@layout/header/Header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Meal Prep JS</title>
        <meta name="description" content="App for meal prep recipes" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  )
}
