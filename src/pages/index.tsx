import { GetServerSideProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import { stripe } from '../services/stripe'
import { SignInButton } from '../components/SignInButton'
import { useSession } from 'next-auth/client'
interface productProps { 
  product:{
    id: number;
    price: number;
    name: string;
    image: string;
    description: string;
  }
}

export default function Home({ product }: productProps) {
  const [session] = useSession()
  return (
    <>
    <Head>
      <title>Home</title>
    </Head>
    <div className={styles.header}>
      <div className={styles.textH4}>
        <h1 className={styles.textHeader}>
          ola {session && session.user.name}
        </h1>
        <button className={styles.closeButton}>
          <img src="closeIcon.png" className={styles.closeImage}/>
        </button>
      </div>
      <SignInButton />
    </div>
    <main className={styles.mainTag}>
      <div className={styles.card}>
        {product.name}
        <Image src={product.image} width="120px" height="100px" alt={product.description}/>
      </div>
    </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () =>{
  const priceProduct = await stripe.prices.retrieve('price_1JfXDVHBcM4EyCHKmHpuJph7', {
    expand: ['product']
  })
  const infoProduct = await stripe.products.retrieve('prod_KKBatjJwuU8UoB')
  const product = {
    id: priceProduct.id,
    price: priceProduct.unit_amount / 100,
    name: infoProduct.name,
    image: infoProduct.images[0],
    description: infoProduct.description
  }
  return {
    props: {
      product
    }
  }
}
