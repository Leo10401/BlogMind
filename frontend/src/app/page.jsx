'use client'
import MainNavbar from '@/components/MainNavbar';
import React from 'react';
import {Tabs, Tab, Card, CardBody, Switch} from "@nextui-org/react";
import Bloglist from './(main)/listblog/page';
import Listcomp from './(main)/competition/page';

const Home = () => {
  const [isVertical, setIsVertical] = React.useState(false);
  return (
    <>
      <MainNavbar />
    <div className="flex flex-col px-4">
      <Switch className="mb-4" isSelected={isVertical} onValueChange={setIsVertical}>
        Vertical
      </Switch>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" isVertical={isVertical} >
          <Tab key="Home" title="Home">
            <Card >
              <CardBody>
              <div className="contain w-screen bg-background text-primary-foreground py-20 px-4 md:px-8 lg:px-16 xl:px-32 flex flex-col items-center  h-screen">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center text-black">Welcome to Our Blog</h1>
                <p className="text-lg md:text-xl lg:text-2xl text-center mb-8 text-black">Explore the latest articles, news, and insights</p>
                <a href="#" className="bg-primary text-primary-foreground hover:bg-primary/80 py-2 px-6 rounded-lg transition-colors duration-300 ease-in-out items-center">Read More</a>
              </div>
                     </CardBody>
            </Card>  
          </Tab>
          <Tab key="New" title="latest">
            <Card>
              <CardBody>
                <Bloglist/>           
              </CardBody>
            </Card>  
          </Tab>
          <Tab key="competition" title="Chalenges">
            <Card>
              <CardBody>
                <Listcomp/>
              </CardBody>
            </Card>  
          </Tab>
        </Tabs>
      </div>
    </div>
  


    
    </>
  )
}

export default Home;