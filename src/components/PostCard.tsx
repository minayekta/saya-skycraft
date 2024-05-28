import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type postData = {
  id: number
  title: string
  description: string
}

function PostCard(postData: postData | any) {
  return (
    <div className="bg-white p-8">
      <div className="flex flex-col">
        {/* <div className='py-3'>
            <Image alt='post-image' className='object-cover' src={''}/> 
        </div> */}
        <div className="flex flex-col">
          <h3 className="text-gray-800 pb-3">{postData.title}</h3>
          <p>{postData.description}</p>
        </div>
        <Link href={`/blog/${postData.id}`} className="px-3 py-2 text-white bg-blue-700 mt-2">
          Details
        </Link>
      </div>
    </div>
  )
}

export default PostCard
