import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Navbar } from '../components/Navbar';
import { LoginForm } from '../components/LoginForm';

export default function LoginFrontend() {
  return (
    <>
    <Navbar />
    <LoginForm />
    </>
  )
}