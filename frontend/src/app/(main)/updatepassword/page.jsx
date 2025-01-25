'use client'
import axios from 'axios';
import { Formik } from 'formik'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const UpdateComp = () => {
    const { id } = useParams();
    const [UserData, setUserpData] = useState(null);
    const fetchUserData = async () => {
        const res = await axios.get(`http://localhost:5000/user/getbyid/` + id);
        const data = res.data;
        console.log(data);
        setUserData(data)
    }
    useEffect(() => {
        fetchUserData();
    }, []);
    const submitPass = (values) => {
        console.log(values);

        axios.put(`http://localhost:5000/user/update/` + id, values)
            .then((result) => {
                // Router.push('/manage-competition')
                console.log(result);
                toast.success('Password  updated successfully');
            })
            .catch((err) => {
                console.log(err);
                toast.error(err?.response?.data?.message || 'something went wrong')

            })

    }


    return (UserData !== null ? (
        <div>
            <Formik initialValues={UserData} onSubmit={submitPass} className="text-gray-600 body-font relative">
                {(updatePass) => {
                    return (
                        <div className="container px-5 py-24 mx-auto">
                            <div className="flex flex-col text-center w-full mb-12">
                                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">UPDATE COMPETITON</h1>
                                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">UPDATE YOUR COMPETITION</p>
                            </div>
                            <form className="lg:w-1/2 md:w-2/3 mx-auto" onSubmit={updateForm.handleSubmit}>
                                <div className="flex flex-wrap -m-2">
                                    <div className="p-2 w-1/2">
                                        <div className="relative">
                                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Title</label>
                                            <input
                                                onChange={updatePass.handleChange}
                                                value={updatePass.values.password}
                                                type="text" id="title" name="title"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div className="p-2 w-1/2">
                                        <div className="relative">
                                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Title</label>
                                            <input
                                                onChange={updatePass.handleChange}
                                                value={updatePass.values.password}
                                                type="text" id="title" name="title"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div className="p-2 w-full">
                                        <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    )
                }
                }
            </Formik>

        </div>) : (
        <h1>loading</h1>
    ))



}
export default UpdateComp