'use client'
import React, { useState, useEffect } from 'react';
import {Avatar, Chip} from "@heroui/react";
import axios from 'axios'; // Ensure you have axios imported
import { useParams } from 'next/navigation';
import MarkdownEditor from '@uiw/react-markdown-editor';
import Link from 'next/link';
import HTMLReactParser from 'html-react-parser';

const Blog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null); // Initialize as null
  const [error, setError] = useState(null); // State for error
  const [loading, setLoading] = useState(true); // State for loading
  const [catBlogs, setCatBlogs] = useState([]);

  const fetchBlogData = async () => { // Define the fetch function
    try {
      const res = await axios.get(`http://localhost:5000/blog/getbyid/` + id);
      const data = res.data;
      console.log(data);
      fetchBlogsByCategory(data.category);
      setBlogData(data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogsByCategory = async (category) => {
    try {
      const res = await axios.get(`http://localhost:5000/blog/getbycategory/` + category);
      const data = res.data;
      console.log(data);
      setCatBlogs(data);
    } catch (err) {
      setError("Failed to fetch data");
    }
  }

  useEffect(() => {
    fetchBlogData(); // Call the fetch function
  }, [id]);
  useEffect(() => {
    fetchBlogsByCategory(); // Call the fetch function
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='h-screen flex justify-center w-auto '>
      {blogData !== null ? (
        <div className='w-11/12 '>
          <div className="grid grid-cols-12 w-auto">
            <div className='col-span-9'>
              
              {HTMLReactParser(blogData.content)}
              {/* <p>{blogData.content}</p> */}
            </div>
            <div className='col-span-3'>
              <h1>See more like this</h1>
              {
                catBlogs.map((blog, index) => {

                  return <div className="w-96 h-40 flex flex-col justify-center gap-2 bg-neutral-50 rounded-lg shadow p-2">
                    <div className="flex gap-2">
                      <img className="bg-neutral-500 w-24 h-24 shrink-0 rounded-lg" src={blog.image} alt />
                      <div className="flex flex-col">
                        <span className="font-bold text-neutral-700 italic">{blog.title}</span>
                        <p className="line-clamp-3">
                          {blog.desription}
                        </p>
                      </div>
                    </div>
                    <Link href={'/blog/' + blog._id} className="hover:bg-indigo-700 bg-indigo-500 font-bold text-neutral-50 rounded p-2">
                      See more
                    </Link>
                  </div>

                })

              }
            </div>
          </div>
          <footer>
            <Chip
                classNames={{
                  base: "flex item-right bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                  content: "drop-shadow shadow-black text-white",
                }}
                variant="shadow"
              >
                <p>{blogData.category}</p>
              </Chip>
          <Avatar isBordered src={blogData.author.avatar} />
            {blogData.author.name}
            <br />
            <h2>
              Tags:-<Chip>{blogData.tags}</Chip>
              </h2>
            
            </footer>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
}

export default Blog;