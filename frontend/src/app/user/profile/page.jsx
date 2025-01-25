'use client'
import React, { useEffect, useState } from 'react';
import useAppContext from "@/context/AppContext.jsx";
import axios from 'axios';


const Profile = () => {
  const { email } = useAppContext();

  const [userData, setuserData] = useState([]);
  const fetchuserData = async () => {
    const res = await axios.get(`http://localhost:5000/user/getbyemail/` + email);
    const data = res.data;
    console.log(data);
    setuserData(data)
  }
  useEffect(() => {
    fetchuserData();
  }, []);

  return (
    <div className=' h-screen flex w-11/12 justify-center items-center'>
      {
        userData !== null ?  ( 
          <div className="flex flex-col  md:flex-row bg-white shadow-lg max-w-4xl  rounded-lg overflow-">
          {/* Image Section */}
          <div className="md:w-1/2">
            <img
              src={userData.avatar} // Replace with the path to your image
              alt="Person"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Text Section */}
          <div className="md:w-1/2 bg-gray-900 text-white p-8 flex flex-col justify-center">
            <div className="text-5xl text-gray-500 mb-4">&ldquo;            
              <p className="text-lg leading-relaxed mb-6">
              {userData.description}
            </p></div>

            <div>
              <p className="font-bold text-white text-lg">{userData.name}</p>
              <p className="text-gray-400">{userData.role}</p>
              <p className="text-gray-400">{userData.email}</p>
            </div>
          </div>
        </div>
        ) : null
      }
    </div>
  );
}
    

export default Profile;