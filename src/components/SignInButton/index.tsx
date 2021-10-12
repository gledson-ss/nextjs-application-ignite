import styles from './style.module.scss'
import { signIn, useSession, signOut } from 'next-auth/client'
const SignInButton = () => {
  const [session] = useSession()
  console.log(session)
  return (
    session ?
    <button className={styles.signInButton} onClick={ () => signOut() }>
      Usuario logado
    </button>
    :
    <button className={styles.signInButton} onClick={ () => signIn('github') }>
      signIn
    </button>
  )
}

export { SignInButton };