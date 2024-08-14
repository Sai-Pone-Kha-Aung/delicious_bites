"use client"
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

type InputsData = {
    title: string;
    desc: string;
    price: number;
    catSlug: string;
}

type OptionData = {
    title: string;
    additionalPrice: number;
}
const AddPage = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = React.useState<InputsData>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const [option, setOption] = React.useState<OptionData>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = React.useState<OptionData[]>([]);
  const [file, setFile] = React.useState<File>();

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  }
  
  return (
    <div className='p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center text-red-500'>
        <form className='flex flex-wrap gap-6'>
            <h1 className='text-4xl mb-2 text-gray-300 font-bold'>
                Add New Product
            </h1>
            <div className='w-full flex flex-col gap-2'>
                <label htmlFor="file" className='text-sm cursor-pointer flex gap-4 items-center'>
                    <Image src="/upload.png" alt="" width={30} height={20}/>
                    <span>Upload Image</span>
                </label>
                <input 
                    type="file" 
                    onChange={(e) => console.log(e)} 
                    id="file"
                    className='hidden'    
                />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label className='text-sm'>Title</label>
                <input 
                    className='ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none'
                    type="text" 
                    placeholder='Title'
                    name='title'
                    onChange={(e) => console.log(e)}
                />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label className='text-sm'>Description</label>
                <input 
                    className='ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none'
                    type="text" 
                    placeholder='Description'
                    name='desc'
                    onChange={(e) => console.log(e)}
                />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label className='text-sm'>Price</label>
                <input 
                    className='ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none'
                    type="number" 
                    placeholder='Price'
                    name='price'
                    onChange={(e) => console.log(e)}
                />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label className='text-sm'>Category</label>
                <input 
                    className='ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none'
                    type="text" 
                    placeholder='Category'
                    name='catSlug'
                    onChange={(e) => console.log(e)}
                />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label className='text-sm'>Options</label>
                <input 
                    className='ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none'
                    type="text" 
                    placeholder='Title'
                    name='title'
                    onChange={(e) => console.log(e)}
                />
                <input 
                    className='ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none'
                    type="number" 
                    placeholder='Additional Price'
                    name='additionalPrice'
                    onChange={(e) => console.log(e)}
                />
                <button 
                    className='bg-gray-500 p-2 text-white'
                    onClick={(e) => console.log(e)}
                    >
                    Add Option
                </button>
            </div>
            <div className='flex flex-wrap gap-4 mt-2'>
                
            </div>
            <button 
                type='submit' 
                className='bg-red-500 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center'
            >
                Submit
            </button>
        </form>
    </div>
  )
}

export default AddPage