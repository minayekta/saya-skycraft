'use client'

import React, { useEffect, useState } from 'react'
import PostCard from '@/components/PostCard'

const Blog = async () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchData()
  }, [])
  console.log(posts)
  return (
    <div className="flex flex-wrap mx-3">
      <div className="w-full md:w-1/3 p-3">
        {' '}
        <PostCard postData={posts} />{' '}
      </div>
    </div>
  )
}

export default Blog
