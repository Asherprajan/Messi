import Axios from "./axios"
import { ToastContainer, toast } from 'react-toastify';

export const register = async (user)=>{
    try {
        const res = await Axios.post('/registration',user)
        console.log('Axioxxx')
       return res
    } catch (error) {
        toast(error?.response?.data?.message || error.message)
        console.log(error?.response?.data?.message || error.message)
    }
}
  