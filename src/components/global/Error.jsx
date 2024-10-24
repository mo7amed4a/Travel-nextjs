'use client'
import { usePathname } from "next/navigation"

export default function ErrorComponent({error}) {
  const pathname = usePathname()
  return (
    <section className='flex flex-col justify-center items-center h-[30vh]'>
      <h1 className="text-xl md:text-2xl text-gray-600 font-bold">{error}</h1>
      <p className="text-sm text-gray-400">{pathname}</p>
    </section>
  )
}
