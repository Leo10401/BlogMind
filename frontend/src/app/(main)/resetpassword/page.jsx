'use client'
import React, { useRef, useState } from 'react'
import { Input } from "@nextui-org/react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { InputOtp } from "@heroui/input-otp";
import { useRouter } from 'next/navigation';



const ResetPassword = () => {
    const [userData, setUserData] = useState(null);
    const [otpValue, setOtpValue] = React.useState("");
    const router = useRouter();

    const emailRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [Error, setError] = useState(false);

    const sendmail = async () => {
        if (!emailRef.current.value) {

            alert("Please enter your email");
            return;
        } else {
            try {
                const res = await axios.get(`http://localhost:5000/user/getbyemail/` + emailRef.current.value);

                const data = res.data;
                setUserData(data);
                console.log("user found");
                toast.success('Otp sent')

                // send otp
                const otpRes = await axios.post('http://localhost:5000/util/send-otp', {
                    recipient: emailRef.current.value
                });

                


            } catch (err) {
                setError("Failed to fetch email");
                if (err.response.status === 404) {
                    toast.error('Email Not found');
                } else {
                    toast.error('Something went wrong');
                    console.log(err);
                }


            } finally {
                setLoading(false);
            }
        };
    }

    const verifyOTP = async () => {
        //verify otp
        try {
            const verifyRes = await axios.post('http://localhost:5000/util/verify-otp', {
                email : emailRef.current.value,
                otp: otpValue
            });
            toast.success('otp Verified');
            console.log("otp verified");
            router.push('/authentication');


        } catch (error) {
            console.log(error);
            toast.error('something went wrong');
        }

    }

    const MailIcon = (props) => {
        return (
            <svg
                aria-hidden="true"
                fill="none"
                focusable="false"
                height="1em"
                role="presentation"
                viewBox="0 0 24 24"
                width="1em"
                {...props}
            >
                <path
                    d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
                    fill="currentColor"
                />
            </svg>
        );
    };
    return (
        <div className='h-96 flex flex-col w-auto justify-center items-center'>
            <div className='flex '><Input
                ref={emailRef}
                isClearable
                isRequired
                className="max-w-xs"
                defaultValue="@gmail.com"
                label="Email"
                type="email"
                startContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
            />

                <button onClick={sendmail} className="text-xl w-32 h-12 rounded bg-emerald-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000">
                    <span className="absolute bg-emerald-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all" />
                    <span className="absolute bg-emerald-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all" />
                    Send OTP
                </button>
            </div>
            <div className="flex flex-col items-start gap-2">
                <InputOtp length={6}  value={otpValue} color='secondary' onValueChange={setOtpValue} />
                <div className="text-small  text-default-500">
                    OTP value: <span className="text-md font-medium">{otpValue}</span>
                </div>
                <button onClick={verifyOTP} className="cursor-pointer transition-all 
            bg-gray-700 text-white px-6 py-2 rounded-lg
            border-green-400
            border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
            active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none">
                    Verify
                </button>

            </div>





        </div>
    )
}

export default ResetPassword;