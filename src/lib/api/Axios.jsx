import axios from "axios";
import Cookies from "js-cookie";
// import { cookies } from "next/headers";

export const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL; 

export const Axios = axios.create({
    baseURL: baseURL + '/api/v1',
    headers: {
        Authorization: `Bearer ${Cookies.get('Authorization') || null}` 
    }
});

// export const AxiosServer = axios.create({
//     baseURL: baseURL + '/api/v1',
//     headers: {
//         Authorization: `Bearer ${cookies()?.get("Authorization")?.value || null}` 
//     }
// });

export const AxiosClient = axios.create({
    baseURL: baseURL + '/api/v1',
    headers: {
        Authorization: `Bearer ${Cookies.get('Authorization') || null}` 
    }
});

