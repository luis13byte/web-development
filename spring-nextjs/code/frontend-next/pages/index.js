import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Navbar } from '../components/Navbar';

export default function Home() {
  return (
    <>
    <Navbar />
    <div className={styles.container}>
      <Head>
        <title>Bienvend@ a mi web </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenido a este sitio web. ¿Quieres <Link href="/login">iniciar sesion</Link>?
        </h1>
      </main>
        
        
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>

    
    </>
  )
}
