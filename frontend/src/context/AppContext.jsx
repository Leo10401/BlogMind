'use client';
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const router = useRouter();
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (typeof window === "undefined") return;

        const token = window.localStorage.getItem("token");
        const storedEmail = window.localStorage.getItem("email");

        setUserLoggedIn(Boolean(token));
        setEmail(storedEmail || "");
    }, []);

    const logout = () => {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("email");
        }

        setUserLoggedIn(false);
        setEmail("");
        router.push('/Authentication');
    };

    return (
        <AppContext.Provider value={{ userLoggedIn, setUserLoggedIn, logout, email, setEmail }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;