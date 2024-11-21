'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Competitions = () => {
  const [Competitions, setCompetitions] = useState([]);
  const fetchCompData = async () => {
    const res = await axios.get('http://localhost:5000/comp/getall/');
    const data = res.data;
    console.log(data);
    setCompetitions(data);

  }
  useEffect(() => {
    fetchCompData();
  }, []);
  return (

    <div>
<section class="text-gray-600 body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
    <div class="-my-8 divide-y-2 divide-gray-100">
      {
        Competitions.map((compet, index) => (

      <div class="py-8 flex flex-wrap md:flex-nowrap">
        <div class=" md:mb-0 mb-6 flex-shrink-0 flex flex-col">
          <span class="font-semibold title-font text-gray-700">   
             <div className="flex items-center justify-around bg-black h-10 rounded-lg shadow-md shadow-black/35 shadow-black/50">
      <button className="flex items-center justify-center  h-10 rounded-full bg-transparent text-white transition-transform ease-in-out duration-300 hover:-translate-y-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          className="text-lg"
        >
          <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
        </svg>
      </button>
    </div></span>
          <span class="mt-1 text-gray-500 text-sm">{compet.startdate}</span>
        </div>
        <div class="md:flex-grow">
          <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">{compet.name}</h2>
          <p class="leading-relaxed">{compet.description}</p>
        </div>
      </div>))}
    </div>
  </div>
</section>
    </div>
  )
}

export default Competitions;