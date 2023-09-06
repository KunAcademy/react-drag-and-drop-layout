'use client'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import { Button } from '@chakra-ui/button'
import { Stack, Switch } from "@chakra-ui/react";

export default function Home() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <h1>Welcome to React Grid Layout</h1>
      <div className={styles.buttonWrapper}>
        <Button colorScheme='blue' type="button" onClick={() => router.push('/home')}>React Beautifu Dnd</Button>
        <Button colorScheme='blue' type="button" onClick={() => console.log("hello")}>React Grid Layout</Button>
        <Stack direction="row">
          <Switch colorScheme="red" />
          <Switch colorScheme="teal" size="lg" />
        </Stack>
      </div>
    </main>
  )
}
