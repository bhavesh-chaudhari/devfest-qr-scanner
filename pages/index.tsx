import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Scanner from '../components/Scanner'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>DevFest QR Scanner</title>
      </Head>
      <div className={styles["container"]}>
        <Scanner></Scanner>
      </div>
    </>
  );
}

export default Home
