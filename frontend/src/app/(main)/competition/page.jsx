'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Listcomp = () => {
    const [Listcomp, setListcomp] = useState([]);
    
    const fetchcompData = async () => {
        const res = await axios.get('http://localhost:5000/comp/getall/');
        const data = res.data;
        console.log(data);
        setListcomp(data);
    }
    
    useEffect(() => {
        fetchcompData(); // Corrected this line
    }, []);

    return (
        <div className='h-screen'>
            <section className="text-gray-400 bg-gray-900 body-font">
                <div className="contain px-5 py-24  mx-auto">
                    <div className=" grid flex-wrap grid-cols-3 gap-4 -m-4">
                        {
                            Listcomp.map((comp, index) => (
                                <div className="p-4 lg:w-1/3 col-span-1" key={index}>
                                   <>
                                    <Link href={'/viewcompetition/'+comp._id} className="card bg-[#dcffe8] shadow-[0px_4px_16px_px_#367E08]  h-[400px] w-[400px] group gap-[0.5em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden" 
                                    >
                                        <div className="absolute top-0 left-0 h-full w-full  hover:height:200" 
                                                                            style={{
                                                                                backgroundImage: `url(${comp.image})`,
                                                                                backgroundSize: 'cover', // Ensures the image covers the entire card
                                                                                backgroundPosition: 'center', // Centers the image
                                                                                
                                                                                height:300
                                                                                
                                                                            }}/>
                                        <div className="contain text-black z-[2] relative font-nunito flex flex-col gap-[0.5em] ">

                                            <div className="h-fit w-full">       
                                                 
                                                <h1 style={{ fontWeight: 900, WebkitTextFillColor: 'transparent', WebkitTextStrokeWidth: 1 }} className="card_heading text-[1.5em] tracking-[.2em]">
                                                    {comp.title}
                                                </h1>
                                                <p style={{ fontWeight: 900, WebkitTextFillColor: 'violet', WebkitTextStrokeWidth: 0.3, textShadow: '2 1 7px #fff', }} className="text-[1.2em]">
                                                    {new Date(comp.lastdate).toDateString()}

                                                </p>
                                            </div>
                                            <div className="flex justify-left items-center h-fit w-full gap-[1.5em]">
                                                {/* Additional content can go here */}
                                            </div>
                                        </div>
                                        <p className="font-nunito block text-black font-light relative h-[0em] group-hover:h-[7em] leading-[1.2em] duration-500 overflow-hidden">
                                            {comp.description}
                                        </p>
                                    </Link></>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Listcomp;