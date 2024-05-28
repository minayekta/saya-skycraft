import React from 'react'
import PostCard from '@/components/PostCard'

const Blog = async () => {
  async function fetchBlogs() {
    const res = await fetch('http://localhost:3000/api/blog', {
      method: 'GET',
      cache: 'no-store',
    })

    // if (!res.ok) {
    //   throw new Error('Failed to fetch data')
    // }

    console.log(res.json)
    return res.json()
  }
  const blogs = await fetchBlogs()

  return (
    <div className="flex flex-wrap mx-3">
      <div className="w-full md:w-1/3 p-3">{/* <PostCard postData={blogs} /> */}</div>
    </div>
  )
}

export default Blog
