import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-dfd0c.firebaseio.com/'
});

export default instance;
