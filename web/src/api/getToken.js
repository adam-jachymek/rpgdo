import { useMutation, useQuery, } from 'react-query';
import { fetchUser } from './requests';


const getToken = () => {

    const token = localStorage.getItem('userToken')

    if (!token) {
        return null
    }

    return token

}


export default getToken