'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const bloglist = () => {
    const [blogList, setblogList] = useState([]);
    const fetchblogData = async () => {
        const res = await axios.get('http://localhost:5000/blog/getall/');
        const data = res.data;
        console.log(data);
        setblogList(data);
      }
      useEffect(() => {
        fetchblogData();
      }, []);
    

  return (
    <div> 
      <div>
        <h1>Blogs</h1>
      </div>
      <div
    class=" container cursor-pointer transition-all duration-500 hover:translate-y-2 w-auto h-40 bg-red-300 rounded-lg shadow-xl flex flex-row items-center m-12 justify-evenly gap-4 px-4"
  >
    
    <div>
      <span class="font-bold text-purple-300">{blogList.title}</span>
      <p class="line-clamp-3">
        {blogList.content}
      </p>
    </div>
  </div>
  </div>
  )
}

export default bloglist