export default function ErrorComponent({error}) {
  return (
    <section className='flex justify-center items-start text-xl text-gray-500 font-bold h-[30vh]'>{error}</section>
  )
}
