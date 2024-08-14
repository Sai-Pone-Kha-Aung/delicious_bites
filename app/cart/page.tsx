"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useCartStore } from '@/utils/store'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const CartPage = () => {
  const  {products, totalItems, totalPrice, removeFromCart} = useCartStore()
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCheckout = async () => {
    if(!session) {
        router.push("/login");
    }
  }
  
  return (
    <div className='flex flex-col text-red-500 lg:flex-row h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]'>
        {/* <Product/> */}
        <div className='h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40'>
            {/* <Single/> */}
            {products.map((item) => (
                <div className="flex items-center justify-between mb-4" key={item.id}>
                <Image src={item.img} alt="" width={100} height={100}/>
                <div>
                    <div className=''>
                        <h1 className='uppercase font-bold text-xl'>{item.title} x{item.quantity}</h1>
                        <span>{item.optionTitle}</span>
                    </div>
                </div>
                <h2 className='font-bold'>${item.price}</h2>
                <span 
                    className='cursor-pointer'
                    onClick={() => removeFromCart(item)}>X</span>
            </div>
            ))}
        </div>

        <div className='h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6'>
            <div className='flex justify-between'>
                <span className="">Subtotal ({totalItems} items)</span>
                <span className="">${totalPrice}</span>
            </div>
            <div className='flex justify-between'>
                <span>Service Cost</span>
                <span>$0.00</span>
            </div>
            <div className='flex justify-between'>
                <span>Deliver Cost</span>
                <span className='text-green-500'>FREE!</span>
            </div>
            <hr className='my-2'/>
            <div className='flex justify-between'>
                <span>TOTAL(INCL. VAT)</span>
                <span>${totalPrice}</span>
            </div>
            <button className='bg-red-500 text-white p-3 rounded-md w-1/2 self-end'
                onClick={handleCheckout}>
                CHECKOUT
            </button>
        </div>
    </div>
  )
}

export default CartPage