import axios from 'axios';

export default axios.create({
  baseURL: 'https://www.googleapis.com/'
  // headers: {
  //   Authorization: `Bearer ${apiKey.youKey}`
  // }
});
