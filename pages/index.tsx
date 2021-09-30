import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <>
    <Head>
      <title>Home</title>
    </Head>
    <div className={styles.header}>
      <div className={styles.textH4}>
        <h1 className={styles.textHeader}>
          ola
        </h1>
      </div>
    </div>
    <main className={styles.mainTag}>
      <div className={styles.card}>
        ola
      </div>
    </main>
    </>
    
  )
}
