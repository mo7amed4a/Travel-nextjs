export default function ViewBlog({html}) {
  return (
    <div 
    className={`preview prose prose-sm md:prose-base lg:prose-lg xl:prose-xl flex flex-col !space-y-2 [&>iframe]:h-96`} 
    dangerouslySetInnerHTML={{ __html: html }} 
  />
  )
}
