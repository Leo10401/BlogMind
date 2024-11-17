'use client';
import { IconX } from '@tabler/icons-react';
import '@wordpress/components/build-style/style.css';
import '@wordpress/block-editor/build-style/style.css';
import axios from 'axios';
import { useFormik } from 'formik'
import JoditEditor from 'jodit-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const Addblog = () => {

  const [previewUrl, setPreviewUrl] = useState([]);

  const token = localStorage.getItem('token');

  const [blogContent, setBlogContent] = useState('# Write your blog here...');

  const [tags, setTags] = useState([]);

  const blogForm = useFormik({
    initialValues: {
      title: '',
      content: '',
      image: '',
      tags: '',
      description: ''
    },
    onSubmit: (values, { resetForm }) => {
      values.tags = tags;
      values.content = blogContent;
      console.log(values);

      axios.post('http://localhost:5000/blog/add', values, {
        headers: {
          'x-auth-token' : token
        }
      })
        .then((result) => {
          toast.success('blog posted successfully');
        }).catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message || 'Something went wrong');
        });
      resetForm();
    }
  });


  const uploadfile = (e) => {
    const file = e.target.files[0];

    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('upload_preset', 'myuploadpreset');
    formdata.append('cloud_name', 'de4osq89e');

    axios.post('https://api.cloudinary.com/v1_1/de4osq89e/image/upload', formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((result) => {
        toast.success('File Uploaded Successfully');
        console.log(result.data);
        setPreviewUrl(result.data.url);
        blogForm.setFieldValue('image', result.data.url)

      }).catch((err) => {

        console.log(err);
        toast.error('File Upload Failed');
      });
  }

  const addTag = (e) => {
    
    if (e.code === 'Enter') {
      e.preventDefault();
      const value = e.target.value;
      setTags([...tags, value])
      e.target.value = '';
    }
  }

  const removeTag = (index) => {
    setTags( tags.filter((_, i) => i!==index) );
  }


  return (
    <div className='bg-emerald-200'>
      {/* Card Section */}
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-6 mx-auto">
        <form onSubmit={blogForm.handleSubmit}>
          {/* Card */}
          <div className="bg-white rounded-xl shadow dark:bg-neutral-900">

            <div className=" p-4 sm:p-7 pt-5">

              <h1 className='my-4 font-bold text-white text-2xl'>Create New Blog</h1>
              {/* Grid */}
              <div className="space-y-4 sm:space-y-6">

                <div className="space-y-2">
                  <label htmlFor="af-submit-app-project-name" className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
                    Blog Title
                  </label >
                  <input id="title" onChange={blogForm.handleChange} value={blogForm.values.title} type="text" className="border py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter project name"
                  />
                </div>


                <div className="space-y-2">
                  <label htmlFor="af-submit-app-upload-images" className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
                    Cover image
                  </label>
                  <label htmlFor="upload-image" className="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-neutral-700">
                    {previewUrl ? (
                      <img src={previewUrl} alt="" className="max-w-full h-40 object-cover rounded-lg" />
                    ) : (
                      <svg className="size-10 mx-auto text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z" />
                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                      </svg>
                    )}
                    <input id='upload-image' onChange={uploadfile} name="af-submit-app-upload-images" type="file" className="hidden" />
                    <span className="mt-2 block text-sm text-gray-800 dark:text-neutral-200">
                      Browse your device or <span className="group-hover:text-blue-700 text-blue-600">drag 'n drop'</span>
                    </span>
                    <span className="mt-1 block text-xs text-gray-500 dark:text-neutral-500">
                      Maximum file size is 2 MB
                    </span>
                  </label>
                </div>
                <label htmlFor="" className='text-white  flex' > Tags</label>
                <input type="text" id='tags' name='tags' onKeyDown={addTag} className='rounded-2xl'/>

                <div className='flex gap-2 rounded-3xl '>
                  {
                    tags.map((tag, index) => (
                      <div className='flex text-white border px-2 py-1 rounded-lg bg 
                      '>
                        <p>{tag}</p>
                        <IconX  className='bg-red-500 ml-1' onClick={() => {removeTag(index)}} />
                      </div>
                    ))
                  }
                </div>

                <div className="space-y-2">
                  <label htmlFor="af-submit-app-category" className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
                    Category
                  </label>
                  <select id="category" onChange={blogForm.handleChange} value={blogForm.values.category} className="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                    <option selected>Select a category</option>
                    <option>TechnologyL</option>
                    <option>Education</option>
                    <option>Entertainment</option>
                    <option>Food & Drink</option>
                    <option>Design & Creativity</option>
                    <option>Environment & Sustainability</option>
                    <option>Parenting & Family</option>
                    <option>Sports & Fitness</option>
                    <option>Lifestyle</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="af-submit-app-description" className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200">
                    Description
                  </label>
                  <textarea id="description" onChange={blogForm.handleChange} value={blogForm.values.description} className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" rows={6} placeholder="A detailed summary will better explain your products to the audiences. Our users will see this in your dedicated product page." defaultValue={""} />
                </div>

               

                <JoditEditor
                      value={blogContent}
                      
                      tabIndex={1} // tabIndex of textarea			
                      onChange={setBlogContent}
                      style={{ width: '100%', height: '700%' }}
                    />  

                  

              </div>
              {/* End Grid */}
              <div className="mt-5 flex justify-center gap-x-2">
                <button type="submit" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                  Submit your project
                </button>
              </div>
            </div>
          </div>
          {/* End Card */}
        </form>
      </div>
      {/* End Card Section */}

    </div>
  )
}

export default Addblog