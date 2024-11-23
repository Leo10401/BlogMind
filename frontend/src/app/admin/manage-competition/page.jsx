'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

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

    const deletecomp = (id) => {
    axios.delete('http://localhost:5000/comp/delete/' + id)
        .then((result) => {
            fetchCompData();
            toast.success('competition deleted successfully');
        }).catch((err) => {
            console.log(err);
            toast.error('Something went wrong');
        });
}

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
             <button   className="flex items-center justify-center  h-10 rounded-full bg-transparent text-white transition-transform ease-in-out duration-300 hover:-translate-y-1">
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
        <div class="md:flex-grow mx-10">
          <h2 class="text-2xl font-medium text-gray-900 title-font mb-2 ">{compet.name}</h2>
          <p class="leading-relaxed">{compet.description}</p>
        </div>
        <div>
        <Link href={'/updatecomp/' +compet._id} className="cursor-pointer transition-all mr-10
        bg-gray-700 text-white px-6 py-2 rounded-lg
        border-green-400
        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none">
          Update
        </Link>
        </div>
        <div>
          <button onClick={() => deletecomp(compet._id)} className="group relative flex h-14 w-14 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600">
            <svg viewBox="0 0 1.625 1.625" className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000" height={15} width={15}>
              <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195" />
              <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033" />
              <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016" />
            </svg>
            <svg width={16} fill="none" viewBox="0 0 39 7" className="origin-right duration-500 group-hover:rotate-90">
              <line strokeWidth={4} stroke="white" y2={5} x2={39} y1={5} />
              <line strokeWidth={3} stroke="white" y2="1.5" x2="26.0357" y1="1.5" x1={12} />
            </svg>
            <svg width={16} fill="none" viewBox="0 0 33 39" className>
              <mask fill="white" id="path-1-inside-1_8_19">
                <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
              </mask>
              <path mask="url(#path-1-inside-1_8_19)" fill="white" d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z" />
              <path strokeWidth={4} stroke="white" d="M12 6L12 29" />
              <path strokeWidth={4} stroke="white" d="M21 6V29" />
            </svg>
          </button>


        </div>
      </div>))
      
      }
    </div>
  </div>
</section>
    </div>
  )
}

export default Competitions;