'use client'

import { useState, ChangeEvent, FormEvent } from 'react'

interface State {
  title: string
  description: string
}

const initialState: State = {
  title: '',
  description: '',
}

export default function Home() {
  const [inputValue, setInputValue] = useState<State>(initialState)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { title, description } = inputValue

    if (title.length < 4) {
      setError('Title must be at least 4 characters long.')
      return
    }

    if (description.length < 20) {
      setError('Description must be at least 20 characters long.')
      return
    }

    try {
      const response = await fetch('http://localhost:3000/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: { 'Content-Type': 'application/json' },
      })
      const res = await response.json()
      console.log(res)
      if (!response.ok) {
        console.error(res)
        setError('An error occurred while creating the post.')
      } else {
        alert('Form Send')
        setInputValue(initialState) // Reset form on success
        setError(null) // Clear error on success
      }
    } catch (error) {
      console.error(error)
      setError('An error occurred while creating the post.')
    }
  }

  return (
    <div className="mt-24 mx-auto w-1/3 bg-white rounded shadow-lg border border-gray-200">
      <div className="flex items-center justify-between px-5 py-4">
        <h1 className="text-lg leading-none font-medium">Create new post</h1>
        <button className="leading-none text-3xl font-light text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="px-5">
          <label className="block mb-4">
            <div className="text-sm text-gray-600 font-medium mb-1">Title</div>
            <input
              name="title"
              value={inputValue.title}
              onChange={handleChange}
              type="text"
              className="border border-gray-400 w-full rounded px-2 py-1"
            />
          </label>
          <label className="block mb-4">
            <div className="text-sm text-gray-600 font-medium mb-1">Description</div>
            <textarea
              name="description"
              value={inputValue.description}
              onChange={handleChange}
              className="border border-gray-400 w-full rounded px-2 py-1 resize-none"
              rows={6}
            ></textarea>
          </label>
          {error && <div className="text-red-500 mb-4">{error}</div>}
        </div>

        <div className="bg-gray-100 justify-end flex px-5 py-3 shadow-inner">
          <div className="-mx-1">
            <button
              type="button"
              className="mx-1 bg-white text-sm px-3 py-2 rounded border border-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mx-1 bg-indigo-600 text-white text-sm font-medium px-3 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
