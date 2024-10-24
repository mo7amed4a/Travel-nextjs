import toast from "react-hot-toast";
import { Axios } from "../lib/api/Axios";


export const deleteTypePackages = async (id) => {
    try {
        const res = await Axios.delete(`/type-package/${id}`);
        toast.success(res?.data?.message);
        toast.success("done");
        return res
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
}