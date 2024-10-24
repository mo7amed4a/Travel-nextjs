"use client";
import useFetch from "@/hooks/useFetch";
import { createContext, useState, useEffect } from "react";

export let DataContext = createContext();

export default function DataContextProvider({ children }) {
    // const storedToken = localStorage.getItem("Authorization");
    const [posts, setPosts] = useState({data: [], loading : false, error : null});
    const [selectPost, setSelectPost] = useState(null);
    const [packagesData, setPackagesData] = useState(null);
    let resPosts = useFetch("/posts");
    useEffect(() => {
        resPosts && setPosts(resPosts);
    }, [resPosts.data]);

    return (
        <DataContext.Provider value={{ posts, setPosts, packagesData, setPackagesData, selectPost, setSelectPost }}>
            {children}
        </DataContext.Provider>
    );
}
