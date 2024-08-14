import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='h-12 md:h-24 p-4 lg:px-20 xl:px-40 text-red-500 flex items-center justify-between'>
        <Link href="/" className='font bold uppercase'>Delicious Bite</Link>
        <p>Copyright © 2024. All rights reserved</p>
    </div>
  )
}

export default Footer