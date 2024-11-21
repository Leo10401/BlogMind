'use client'
import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Card, CardBody, user } from "@nextui-org/react";
import axios from 'axios';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Select, SelectItem } from "@nextui-org/react";

const ViewComp = () => {
    const { id } = useParams();
    const [compData, setCompData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const [participate, setParticipate] = useState();
    const [selBlog, setSelBlog] = useState('');
    const [userBlogs, setUserBlogs] = useState([]);


    const fetchCompData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/comp/getbyid/` + id);
            const data = res.data;
            setCompData(data);
        } catch (err) {
            setError("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const fetchBlog = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/blog/getbyuser`, {
                headers: {
                    'x-auth-token': token
                }
            });
            const data = res.data;
            console.log(data);
            setUserBlogs(data);
            // setCompData(data);
        } catch (err) {
            setError("Failed to fetch blog data");
        } finally {
            setLoading(false);
        }
    };


    const addParticipation = async () => {


        if (!selBlog) {
            toast.error('Please select a blog to participate');
            return;
        }

        const res = await axios.post('http://localhost:5000/part/check-participation', {
            blog: selBlog
        }, {
            headers: {
                'x-auth-token': token
            }
        });

        if (res.status !== 404) {
            toast.error('participation already exists');
            return;
        }

        axios.post('http://localhost:5000/part/add', {
            blog: selBlog,
            competition: id
        }, {
            headers: {
                'x-auth-token': token
            }
        })
            .then((result) => {
                toast.success('blog posted successfully');
            }).catch((err) => {
                console.log(err);
                toast.error(err?.response?.data?.message || 'Something went wrong');
            });
    }



    useEffect(() => {
        fetchCompData();
        fetchBlog();
    }, []);

    if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;

    return (
        <div>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="contain-none px-5 py-24 mx-auto">
                    {compData !== null ? (
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{compData.title}</h1>

                                <div className="flex w-full flex-col">
                                    <Tabs
                                        aria-label="Options"
                                        color="primary"
                                        variant="underlined"
                                        classNames={{
                                            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                                            cursor: "w-full bg-[#22d3ee]",
                                            tab: "max-w-fit px-0 h-12",
                                            tabContent: "group-data-[selected=true]:text-[#06b6d4]"
                                        }}
                                    >
                                        <Tab
                                            key="description"
                                            title={
                                                <div className="flex items-center space-x-2">
                                                    <span>Description</span>
                                                </div>
                                            }
                                        >
                                            <Card>
                                                <CardBody>
                                                    {compData.description}
                                                </CardBody>
                                            </Card></Tab>
                                        <Tab
                                            key="videos"
                                            title={
                                                <div className="flex items-center space-x-2">
                                                    <span>Participants</span>
                                                </div>
                                            }
                                        />
                                    </Tabs>
                                </div>
                                {
                                    token ? (
                                        <h1>Please Login to participate</h1>
                                    ) : (
                                        <div className="flex">


                                            <Select
                                                label="Select a Blog"
                                                className="max-w-xs"
                                                onChange={e => setSelBlog(e.target.value)}
                                            >
                                                {userBlogs.map(blog => (
                                                    <SelectItem key={blog._id} value={blog._id}>
                                                        {blog.title}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                            <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" type='submit' onClick={addParticipation}>take part</button>
                                            <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06  1.06a5.5 5.5 0 007.78 0L12 12.33l1.06 1.06a5.5 5.5 0 007.78-7.78l-1.06-1.06z" />
                                                </svg>
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                            <img alt={compData.image} className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={compData.image} />
                        </div>
                    ) : (
                        <div>No data available</div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ViewComp;