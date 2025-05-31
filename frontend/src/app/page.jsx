"use client"
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react"
import Bloglist from "./(main)/listblog/page"
import Features from "./Features/page"
import Listcomp from "./(main)/competition/page"
import Links from "./(main)/links/page"
import { Navbar } from "@/components/Nav"

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      <div className="flex flex-col px-2 sm:px-4 flex-grow max-w-7xl mx-auto w-full">
        <div className="flex w-full flex-col mt-4">
          <Tabs
            aria-label="Content Sections"
            className="justify-center py-4"
            variant="underlined"
            color="primary"
            size="lg"
          >
            <Tab
              key="home"
              title={
                <div className="flex items-center space-x-2">
                  <span className="text-sm sm:text-base font-medium">Home</span>
                </div>
              }
            >
              <Card className="border-none shadow-md">
                <CardBody className="p-0 sm:p-4">
                  <Features />
                  <Links />
                </CardBody>
              </Card>
            </Tab>
            <Tab
              key="latest"
              title={
                <div className="flex items-center space-x-2">
                  <span className="text-sm sm:text-base font-medium">Latest</span>
                </div>
              }
            >
              <Card className="border-none shadow-md">
                <CardBody className="p-0 sm:p-4">
                  <Bloglist />
                </CardBody>
              </Card>
            </Tab>
            <Tab
              key="challenges"
              title={
                <div className="flex items-center space-x-2">
                  <span className="text-sm sm:text-base font-medium">Challenges</span>
                </div>
              }
            >
              <Card className="border-none shadow-md">
                <CardBody className="p-0 sm:p-4">
                  <Listcomp />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Home
