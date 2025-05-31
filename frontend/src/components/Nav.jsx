"use client"
import Link from "next/link"
import { Menu, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import useAppContext from "@/context/AppContext"
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react"
import Image from "next/image"

const navItems = [
  { label: "Features", href: "/Features" },
  { label: "Competition", href: "/competition" },
  { label: "Blog", href: "/blog" },
  { label: "Top Bloggers", href: "/Rankers" },
]

export function Navbar() {
  const [personalData, setPersonalData] = useState([])
  const { userLoggedIn, email, logout } = useAppContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        if (!email) return
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getbyemail/${email}`)
        setPersonalData(res.data)
      } catch (error) {
        console.error("Error fetching personal data:", error)
      }
    }

    fetchPersonalData()
  }, [email])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const showLoginOptions = () => {
    if (userLoggedIn) {
      return (
        <div className="flex items-center">
          <div className="hidden md:flex items-center space-x-4 z-30">
            <Link
              href="/user/add-blog"
              title="Add New"
              className="group cursor-pointer outline-none hover:rotate-90 duration-300"
            >
              <div className="bg-lime-500 hover:bg-lime-600 rounded-full p-2 transition-all">
                <Plus className="text-white w-5 h-5" />
              </div>
            </Link>

            <div className="flex items-center space-x-2 text-black bg-amber-100 px-3 py-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-6 h-6">
                <circle cx={100} cy={100} r={95} fill="maroon" stroke="darkgoldenrod" strokeWidth={5} />
                <circle cx={100} cy={100} r={70} fill="lightgoldenrodyellow" />
                <path
                  d="M100 30 L110 80 L170 85 L120 120 L130 170 L100 140 L70 170 L80 120 L30 85 L90 80 Z"
                  fill="black"
                  stroke="darkgoldenrod"
                  strokeWidth={2}
                />
                <circle cx={100} cy={100} r={98} fill="none" stroke="yellow" strokeWidth={3} opacity="0.5" />
              </svg>
              <span className="font-medium">{personalData.coins ?? 0}</span>
            </div>

            <Dropdown placement="bottom-end" className="text-black">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name="Jason Hughes"
                  size="sm"
                  src={
                    personalData.avatar ||
                    "https://imgs.search.brave.com/4pQHXz65KDgDjM0lMYhZRwtXX_SVX8YvGF86T2OOPjg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzYxL2Y3/LzVlLzYxZjc1ZWE5/YTY4MGRlZjJlZDFj/NjkyOWZlNzVhZWVl/LmpwZw"
                  }
                  alt="User Avatar"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold text-black">Signed in as</p>
                  <p className="font-semibold">{email}</p>
                </DropdownItem>
                <DropdownItem key="settings">
                  <Link href="/user/Dashboard">My Settings</Link>
                </DropdownItem>
                <DropdownItem onPress={logout} key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="p-2 rounded-md focus:outline-none">
              <Menu className="w-6 h-6" />
            </button>

            {isMenuOpen && (
              <div className="absolute top-16 right-0 bg-white shadow-lg rounded-md p-4 z-50 w-64">
                <div className="flex items-center space-x-2 text-black mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-6 h-6">
                    <circle cx={100} cy={100} r={95} fill="maroon" stroke="darkgoldenrod" strokeWidth={5} />
                    <circle cx={100} cy={100} r={70} fill="lightgoldenrodyellow" />
                    <path
                      d="M100 30 L110 80 L170 85 L120 120 L130 170 L100 140 L70 170 L80 120 L30 85 L90 80 Z"
                      fill="black"
                      stroke="darkgoldenrod"
                      strokeWidth={2}
                    />
                    <circle cx={100} cy={100} r={98} fill="none" stroke="yellow" strokeWidth={3} opacity="0.5" />
                  </svg>
                  <span className="font-medium">{personalData.coins ?? 0}</span>
                </div>

                <Link
                  href="/user/add-blog"
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md mb-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add New Blog</span>
                </Link>

                <Link
                  href="/user/Dashboard"
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md mb-2"
                >
                  <span>My Settings</span>
                </Link>

                <button
                  onClick={logout}
                  className="flex items-center space-x-2 p-2 hover:bg-red-100 text-red-600 rounded-md w-full text-left"
                >
                  <span>Log Out</span>
                </button>

                <div className="border-t mt-2 pt-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block p-2 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )
    } else {
      return (
        <Link
          href="/Authentication"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all"
        >
          Login
        </Link>
      )
    }
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link className="mr-4 flex items-center" href="/">
              <div className="object-contain font-bold text-inherit text-start">
                <Image src="/black.png" alt="Logo" className="bg-none" width={50} height={50} />
              </div>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-black hover:text-black px-3 py-2 rounded-md text-sm font-medium relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {showLoginOptions()}
        </div>
      </div>
    </nav>
  )
}
