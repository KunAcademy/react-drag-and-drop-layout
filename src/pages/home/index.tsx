'use client'
import React from 'react';
import { Switch } from '@chakra-ui/react'
import { Providers } from '../provivers';
import styles from './styles.module.scss';

export default function Home() {
  return (
    <Providers>
      <div className={styles.container}>
        <Switch />
      </div>
   </Providers>    
  )
}