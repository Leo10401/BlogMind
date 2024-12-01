'use client'
import React, { useState, useEffect } from 'react';

import axios from 'axios'; // Ensure you have axios imported
import { useParams } from 'next/navigation';

const Blog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null); // Initialize as null
  const [error, setError] = useState(null); // State for error
  const [loading, setLoading] = useState(true); // State for loading

  const fetchBlogData = async () => { // Define the fetch function
    try {
      const res = await axios.get(`http://localhost:5000/blog/getbyid/` + id);
      const data = res.data;
      setBlogData(data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData(); // Call the fetch function
  }, [id]); 

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p>{error}</p>; 
  }

  return (
    <div className='w-11/12 border-rose-50'>
      {blogData !== null? (
        <div>

          <h1>{blogData.title}</h1>
          <p>{blogData.content}</p>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
}

export default Blog;