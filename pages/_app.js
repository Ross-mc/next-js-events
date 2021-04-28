import Head from 'next/head'
import Layout from '../components/layout/Layout'
import Notification from '../components/notification/notification'
import '../styles/globals.css'

//here we define a global head tag. This is overwritten if we specifically define the properties
//in specific pages. But here it ensures we always have a defaul title, description etc.

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <title>NextJS Events</title>
        <meta name="description" content="An App for finding programming events"/>
      </Head>
      <Component {...pageProps} />
      <Notification title="Test" message="this is a test" status="pending" />
    </Layout>
  )
}

export default MyApp
