import { baseURL } from '@/lib/api/Axios'
import { Button } from 'flowbite-react'
import Image from 'next/image'
import React from 'react'

export default function ImageAndGrid({images, openModal}) {

    function getCol(colIndex) {
        return images.filter((resource, index)=>{
            return index % 4 === colIndex
        })
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 w-full'>
        { typeof images != 'undefined' && images.length > 0 ? [getCol(0),getCol(1),getCol(2), getCol(3)].map((col, indx)=>{
            return <div key={indx} className='flex flex-col gap-4'>
            {col.map((item, index)=> (
                <div key={index} className='relative'>
                    <Button
                        color="failure"
                        onClick={()=>openModal(item)}
                        className="absolute top-2 end-2"
                    >
                        Delete
                    </Button>
                    <Image src={baseURL+item} className='w-full' alt="image" width={400} height={400} />
                </div>
            ))}
            </div>
        }) :
            <div className="h-[85vh] col-span-full flex justify-center items-center">
                <h1 className="text-xl text-base-content/70 font-medium">No Image yet</h1>
            </div>
        }
    </div>
  )
}