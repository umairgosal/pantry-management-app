import React from 'react'
import Card from '../components/Card'
import { Container } from '@mui/material'

const page = () => {
  return (
    <Container className='p-10'>
      <div className='grid grid-cols-3'>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </Container>
  )
}

export default page