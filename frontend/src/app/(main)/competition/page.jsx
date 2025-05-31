"use client"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const Listcomp = () => {
  const [Listcomp, setListcomp] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchcompData = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comp/getall/`)
      const data = res.data
      setListcomp(data)
    } catch (error) {
      console.error("Error fetching competition data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchcompData()
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

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <section className="text-gray-700 body-font py-8">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Active Challenges</h2>

          {Listcomp.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No challenges available at the moment.</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {Listcomp.map((comp, index) => (
                <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.03 }} className="h-full">
                  <Link href={"/viewcompetition/" + comp._id} className="block h-full">
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col transition-all duration-300 hover:shadow-xl">
                      <div className="h-48 bg-cover bg-center relative overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
                          style={{ backgroundImage: `url(${comp.image})` }}
                        />
                        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full h-1/2"></div>
                        <div className="absolute bottom-2 right-2">
                          <span className="inline-block bg-white/90 text-xs font-semibold px-2 py-1 rounded-full">
                            {new Date(comp.lastdate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex-grow flex flex-col">
                        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{comp.title}</h2>
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{comp.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            Ends: {new Date(comp.lastdate).toLocaleDateString()}
                          </span>
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Join Now
                          </span>
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
  )
}

export default Listcomp
