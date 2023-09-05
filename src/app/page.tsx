'use client'
import styles from './page.module.css'
import { Button } from '@chakra-ui/button'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to React Grid Layout</h1>
      <Button colorScheme='blue' type="button" onClick={() => console.log("hello")}>Button</Button>
      <div></div>
    </main>
  )
}
