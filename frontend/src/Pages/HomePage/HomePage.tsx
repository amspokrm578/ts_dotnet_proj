import React from 'react'
import Hero from '../../Components/Hero/Hero'
import { Link } from 'react-router-dom'

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div>
        <Link to="/">HomePage</Link>
        <Hero/>
    </div>
    
  )
}

export default HomePage