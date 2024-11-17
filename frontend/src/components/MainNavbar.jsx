'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { useRouter } from 'next/navigation';
import {Modal, ModalContent, Button, useDisclosure} from "@nextui-org/react";
import App from "@/app/(main)/authentication/page.jsx";

const MainNavbar = () => {

  const router = useRouter();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  return (
    <Navbar isBordered>
      <NavbarContent justify="start" className="flex text-center">
        <NavbarBrand className="mr-4">
          <AcmeLogo />
          <p className="hidden sm:block font-bold text-inherit text-start">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-12">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="secondary">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
          <NavbarItem>
            <button
              onClick={() => { router.push("/authentication") }}
              title="Add New"
              class="group cursor-pointer outline-none hover:rotate-90 duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
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

            <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
      >
        <ModalContent className="width[100px] h-auto">
          {(onClose) => (
            <div className="">
              <App/>          </div>
          )}
        </ModalContent>
      </Modal>
    </>
    
 


          </NavbarItem> 
        </NavbarContent>
      </NavbarContent>
    </Navbar>);

}
export default MainNavbar;