'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Manageblog = () => {
  const token = localStorage.getItem('token');
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/blog/getbyuser`, {
        headers: {
          'x-auth-token': token // Use the correct variable name
        }
      });
      const data = res.data;
      console.log(data);
      setUserBlogs(data);
    } catch (err) {
      setError("Failed to fetch blog data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog(); // Fetch blogs when component mounts
  }, []);

  const deleteBlog = (id) => {
    axios.delete(`http://localhost:5000/blog/delete/` + id)
      .then(() => {
        fetchBlogData(); // Refresh data after deletion
        toast.success('Your Blog deleted successfully');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Something went wrong while deleting Blog');
      });
  };


  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-green-500">Your Blogs</h1>
              <div className="h-1 w-20 bg-indigo-500 rounded" />
            </div>
            
          </div>
          {
            !token ? (
              <h1>Please Login to participate</h1>
            ) : loading ? (
              <h1>Loading...</h1> // Show loading state
            ) : error ? (
              <h1>{error}</h1> // Show error message
            ) : (
              <div className="flex flex-wrap -m-4">
                {userBlogs.map((blog) => (
                  <div className="xl:w-1/4 md:w-1/2 p-4" key={blog._id}>
                  <Link href={'/blog/' + blog._id}>
                    <div  className="bg-gray-100 p-6 rounded-lg">
                      <img className="h-40 rounded w-full object-cover object-center mb-6" src={blog.image || "https://dummyimage.com/720x400"} alt="content" />
                      <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{blog.subtitle}</h3>
                      <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{blog.title}</h2>
                      <p className="leading-relaxed text-base">{blog.description}</p>
                      
                      <button onClick={() => deleteBlog(blog._id)} className="group relative flex h-14 w-14 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600">
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


                    </div></Link>
                  </div>
                ))}
              </div>
            )
          }
        </div>
      </section>
    </div>
  )
}

export default Manageblog;