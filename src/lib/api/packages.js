import { Axios } from "./Axios";



export async function getAllPackages(){
    try {
      let data;
      await Axios.get(`/package?pageNumber=${1}&PACKAGE_PER_PAGE=10`).then((res) => {
        data = res.data;
      });
      return data;
    } catch (error) {
      return undefined
    }
  }
  