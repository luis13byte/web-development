import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Navbar } from '../components/Navbar';
import { LoginForm } from '../components/LoginForm';

export default function UserInfo() {
  return (
    <>
    <Navbar />
    <h2>Hola bienvenido a la pagina de usuario</h2>
    </>
  )
}