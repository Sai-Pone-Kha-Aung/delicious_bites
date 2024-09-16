import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CartIcon from '../CartIcon/CartIcon';
import Menu from '../Menu/Menu';
import UserLinks from '../UserLinks/UserLinks';

const Navbar = () => {
  const user = false;
  return (
    <div className="h-12 text-white p-4 flex items-center justify-center uppercase text-xl bg-red-500 md:h-24 lg:px-20 xl:px-40">
        <div className='flex-1 items-center font-bold'>
            <Link href="/">Delicious Bite</Link>
        </div>
        <div className='items-center justify-between gap-4 hidden flex-1 md:flex'>
            <Link href="/">HomePage</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/about">About</Link>
            <Link href="/">Contact</Link>
        </div>
        {/* Mobile */}
        <div className='md:hidden justify-end'>
            <Menu/>
        </div>

        <div className='hidden md:flex gap-4 items-center justify-end flex-1'>
            <div className='md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md'>
                <Image
                    src="/phone.png"
                    alt=""
                    width={20}
                    height={20}
                />
                <span>123 456 78</span>
            </div>
            <UserLinks/>
            <CartIcon />
        </div>
    </div>
  )
}

export default Navbar