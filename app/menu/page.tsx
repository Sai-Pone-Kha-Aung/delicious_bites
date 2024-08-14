import { menu } from '@/constant/data'
import { MenuType } from '@/types/types'
import Link from 'next/link'
import React from 'react'

const getData = async () => {
    const res = await fetch('http://localhost:3000/api/categories', {
        cache:"no-store"
    })

    if(!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json() 
}
const MenuPage = async() => {
    const menu:MenuType = await getData()
  return (
    <div className='flex flex-col p-4 lg:px-20 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] items-center md:flex-row'>
        {menu.map((category) => (
            <Link href={`/menu/${category.slug}`}
                key={category.id}
                className='w-full h-1/3 bg-cover p-8 md:h-1/2'
                style={{backgroundImage: `url(${category.img})`}}
            >
                <div className={`text-${category.color}w-1`}>
                    <h1 className='font-bold uppercase text-3xl'>
                        {category.title}
                    </h1>
                    <p className="text-md my-8 w-1/2">
                        {category.desc}
                    </p>
                    <button className={`hidden 2xl:block bg-${category.color} text-${category.color === "black" ? "white" : "bg-white text-red-400"} py-2 px-4 rounded-md`}>Explore</button>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default MenuPage