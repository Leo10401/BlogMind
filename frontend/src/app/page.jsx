'use client'

import React from 'react';
import {Tabs, Tab, Card, CardBody, Switch} from "@nextui-org/react";
import Bloglist from './(main)/listblog/page';
import Features from './Features/page';
import Listcomp from './(main)/competition/page';
import UserNavbar from '@/components/UserNavbar';
import Links from './(main)/links/page';


const Home = () => {
  const [isVertical, setIsVertical] = React.useState(false);
  return (
    <>
      <UserNavbar />
    <div className="flex flex-col px-4">
      <Switch className="mb-4" isSelected={isVertical} onValueChange={setIsVertical}>
        Vertical
      </Switch>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" isVertical={isVertical} >
          <Tab  title="Home">
            <Card >
              <CardBody>
                <Features/>
                <Links/>
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