"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { formatDistance } from "date-fns"
import "./style.css"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { Eye, Search, Filter } from "lucide-react"

const BlogList = () => {
  const [blogList, setBlogList] = useState([])
  const [masterList, setMasterList] = useState([])
  const [selectedCategories, setSelectedCategories] = useState(new Set())
  const [sortOption, setSortOption] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const fetchBlogData = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog/getall/`)
      const data = res.data
      setBlogList(data)
      setMasterList(data)
    } catch (error) {
      console.error("Error fetching blog data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const searchBlogName = (e) => {
    const value = e.target.value
    const filteredBlogList = masterList.filter((blog) => blog.title.toLowerCase().includes(value.toLowerCase()))
    setBlogList(filteredBlogList)
  }

  const filterCategory = (category) => {
    const updatedCategories = new Set(selectedCategories)
    if (updatedCategories.has(category)) {
      updatedCategories.delete(category)
    } else {
      updatedCategories.add(category)
    }
    setSelectedCategories(updatedCategories)

    if (updatedCategories.size === 0) {
      setBlogList(masterList)
    } else {
      const filteredBlogList = masterList.filter((blog) => updatedCategories.has(blog.category))
      setBlogList(filteredBlogList)
    }
  }

  const handleSortChange = (e) => {
    const value = e.target.value
    setSortOption(value)

    const sortedBlogList = [...blogList]
    if (value === "most-views") {
      sortedBlogList.sort((a, b) => b.viewCount - a.viewCount)
    } else if (value === "least-views") {
      sortedBlogList.sort((a, b) => a.viewCount - b.viewCount)
    } else if (value === "newest") {
      sortedBlogList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (value === "oldest") {
      sortedBlogList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }
    setBlogList(sortedBlogList)
  }

  useEffect(() => {
    fetchBlogData()
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const categories = [
    { name: "Education", icon: "backpack" },
    { name: "Entertainment", icon: "building-carousel" },
    { name: "Food & Drink", icon: "grill" },
    { name: "Design & Creativity", icon: "palette" },
    { name: "Environment & Sustainability", icon: "leaf" },
    { name: "Technology", icon: "robot" },
    { name: "Lifestyle", icon: "plane" },
    { name: "Sports & Fitness", icon: "cricket" },
    { name: "Parenting & Family", icon: "hearts" },
  ]

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="hola">
        <div className="text-center">
          <div className="relative overflow-hidden">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
              <div className="text-center">
                <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">Latest Blogs</h1>
                <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
                  Stay in the know with insights from industry experts.
                </p>

                <div className="mt-6 sm:mt-8 mx-auto max-w-xl relative">
                  {/* Search Form */}
                  <form className="relative">
                    <div className="relative z-10 flex gap-x-3 p-2 bg-white border rounded-lg shadow-md">
                      <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          onChange={searchBlogName}
                          className="py-2.5 pl-10 pr-4 block w-full border-transparent rounded-lg focus:border-purple-500 focus:ring-purple-500 bg-gray-50"
                          placeholder="Search articles..."
                        />
                      </div>
                    </div>
                  </form>

                  {/* Decorative elements */}
                  <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                    <svg
                      className="w-16 h-auto text-purple-500 opacity-60"
                      width={121}
                      height={135}
                      viewBox="0 0 121 135"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                        stroke="currentColor"
                        strokeWidth={10}
                        strokeLinecap="round"
                      />
                      <path
                        d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                        stroke="currentColor"
                        strokeWidth={10}
                        strokeLinecap="round"
                      />
                      <path
                        d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                        stroke="currentColor"
                        strokeWidth={10}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                    <svg
                      className="w-40 h-auto text-green-500 opacity-60"
                      width={347}
                      height={188}
                      viewBox="0 0 347 188"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                        stroke="currentColor"
                        strokeWidth={7}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap justify-center">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="mb-4 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none"
                  >
                    <Filter className="h-4 w-4" />
                    {showFilters ? "Hide Filters" : "Show Filters"}
                  </button>

                  {showFilters && (
                    <div className="w-full">
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {categories.map((category) => (
                          <button
                            key={category.name}
                            onClick={() => filterCategory(category.name)}
                            className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border ${
                              selectedCategories.has(category.name)
                                ? "bg-purple-100 border-purple-300 text-purple-800"
                                : "border-gray-200 bg-white text-gray-800"
                            } shadow-sm hover:bg-gray-50 focus:outline-none transition-colors`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>

                      <div className="flex justify-center mb-6">
                        <select
                          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          value={sortOption}
                          onChange={handleSortChange}
                        >
                          <option value="">Sort by</option>
                          <option value="newest">Newest First</option>
                          <option value="oldest">Oldest First</option>
                          <option value="most-views">Most Views</option>
                          <option value="least-views">Least Views</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="py-8">
          <div className="container px-4 mx-auto">
            {blogList.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500">No blogs found matching your criteria.</p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {blogList.map((blog, index) => (
                  <motion.div key={index} variants={itemVariants} whileHover={{ y: -5 }} className="h-full">
                    <Link href={"/blog/" + blog._id} className="block h-full">
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl">
                        <div className="relative overflow-hidden h-48">
                          <Image
                            src={blog.image || "/placeholder.svg"}
                            alt={blog.title}
                            width={500}
                            height={300}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          />
                        </div>
                        <div className="p-5 flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{blog.title}</h2>
                            <div className="flex items-center text-gray-500 text-sm ml-2 whitespace-nowrap">
                              <Eye className="w-4 h-4 mr-1" />
                              <span>{blog.viewCount}</span>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm mt-1 mb-3 line-clamp-3 flex-grow">{blog.description}</p>

                          <div className="mt-auto">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {blog.tags && blog.tags.length > 0 ? (
                                blog.tags.slice(0, 3).map((tag, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                                  >
                                    #{tag}
                                  </span>
                                ))
                              ) : (
                                <span className="text-gray-400 text-xs">No tags</span>
                              )}
                            </div>

                            <div className="flex justify-between items-center text-xs text-gray-500">
                              <span>{formatDistance(new Date(blog.createdAt), new Date(), { addSuffix: true })}</span>
                              <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                {blog.category || "Uncategorized"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default BlogList
