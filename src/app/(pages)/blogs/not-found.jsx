import Link from "next/link";

export default function notFound() {
  return (
    <div className='flex justify-center items-center w-full'>
      <div className={`h-screen  flex justify-center items-center w-full`}>
        <div className='relative text-center md:text-start w-full md:w-auto'>
            <h6 className='text-[150px] md:text-[240px] font-bold text-secondary-500 text-opacity-35'>404</h6>
            <p className='w-full -mt-10 md:mt-0 xl:w-[160%] md:absolute md:-left-5 md:top-2/4 text-secondary-500 font-bold text-xl md:text-3xl'>Oops! That blogs can't be found</p>
            <div className='text-center md:-mt-8'>
                <Link href='/' className='text-primary-500 hover:underline font-bold'>Go to home page</Link>
            </div>
        </div>
      </div>
    </div>
  )
}


