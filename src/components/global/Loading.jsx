import { Spinner } from 'flowbite-react'
import React from 'react'

export default function Loading() {
  return (
    <section className="w-full h-[50vh] flex justify-center items-start">
        <div className="flex flex-col space-y-4 justify-center items-center">
        <Spinner aria-label="Spinner button example" size="xl" />
        <h5 className="font-bold text-lg text-gray-700">Loading ...</h5>
        </div>
    </section>
  )
}
