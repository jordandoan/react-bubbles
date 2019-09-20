import axios from 'axios';

export const axiosWithAuth = () => {
  let token = localStorage.getItem('token');
  return axios.create(
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    }
  );
};