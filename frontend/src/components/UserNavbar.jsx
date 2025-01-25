'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { SearchIcon } from "./SearchIcon.jsx";
import { useRouter } from 'next/navigation';
import useAppContext from "@/context/AppContext.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const UserNavbar = () => {

  const router = useRouter();


  const { userLoggedIn, logout, email } = useAppContext();
  const [personalData, setpersonalData] = useState([]);
  const fetchpersonalData = async () => {
    const res = await axios.get(`http://localhost:5000/user/getbyemail/` + email);
    const data = res.data;
    console.log(data);
    setpersonalData(data)
  }

  useEffect(() => {
    fetchpersonalData();
  }, []);

  const showLoginOptions = () => {
    if (userLoggedIn) { 
      return (
      <NavbarContent as='div'  className="items-center" justify="end">

      <Dropdown placement="bottom-end" className="text-black">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="primary"
            name="Jason Hughes"
            size="sm"
            src={personalData.avatar} alt="https://imgs.search.brave.com/4pQHXz65KDgDjM0lMYhZRwtXX_SVX8YvGF86T2OOPjg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzYxL2Y3/LzVlLzYxZjc1ZWE5/YTY4MGRlZjJlZDFj/NjkyOWZlNzVhZWVl/LmpwZw"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold text-black">Signed in as</p>
            <p className="font-semibold">{email}</p>
          </DropdownItem>
          <DropdownItem href='/user/Dashboard/' key="settings">My Settings</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem onClick={logout} key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div
  class="flex justify-center items-center bg-[#1c1f2f] rounded-lg pl-3 gap-3 w-24 h-14 font-sans"
>
  <div class="flex items-center justify-center w-16">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-10">
                <circle cx={100} cy={100} r={95} fill="maroon" stroke="darkgoldenrod" strokeWidth={5} />
                <circle cx={100} cy={100} r={70} fill="lightgoldenrodyellow" />
                <path d="M100 30 L110 80 L170 85 L120 120 L130 170 L100 140 L70 170 L80 120 L30 85 L90 80 Z" fill="black" stroke="darkgoldenrod" strokeWidth={2} />
                <circle cx={100} cy={100} r={98} fill="none" stroke="yellow" strokeWidth={3} opacity="0.5" />
              </svg>
  </div>

  <div class="flex flex-col items-start w-[120px]">
    <p class="text-[13.5px] text-white font-semibold tracking-[0.5px]">
      <span id="currency"></span>{personalData.coins}
    </p>
  </div>
</div>


    </NavbarContent>)
    } else {
      return <Link href="/authentication">Login</Link>
    }
  }

  return (
    <Navbar isBordered>
      <NavbarContent justify="start" className="flex text-center">
       
          <Link className="mr-4" href="/"><AcmeLogo />
          </Link>
          <Link href="/" className="hidden sm:block font-bold text-inherit text-start">ACME</Link>
        
        <NavbarContent className="hidden sm:flex gap-12">
          <NavbarItem>
            <Link color="foreground" href="/Features">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="/competition" aria-current="page" color="Competition">
              Competition
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
           <Link href="/user/add-blog/" color="foreground" aria-current="page">Add blog
              <button 
              onClick={() => { router.push("/user/add-blog") }}
              title="Add New"
              class="group cursor-pointer outline-none hover:rotate-90 duration-300"
            >
              
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40px"
                height="20px"

                viewBox="0 0 24 24"
                class="stroke-zinc-400 fill-none group-hover:fill-green-100 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
              >
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  stroke-width="1.5"
                ></path>
                <path d="M8 12H16" stroke-width="1.5"></path>
                <path d="M12 16V8" stroke-width="1.5"></path>
              </svg>
            </button>
            </Link>
          </NavbarItem>      
          
       
      {showLoginOptions()}
        </NavbarContent>
      </NavbarContent>


    </Navbar>
  );
}
export default UserNavbar;