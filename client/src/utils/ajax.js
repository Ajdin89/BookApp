import axios from 'axios';

const API_URL = 'http://localhost:3001';
const url = route => `${API_URL}/api/${route}`;

export async function get(route, config) {
  const headers = {
    'X-Auth-Token': localStorage.getItem('token'),
    'content-type': 'application/json'
  }

  return axios
    .get(url(route), { ...config, headers })
    .then(res => res.data)
}

export async function post(route, data) {
  const headers = {
    'X-Auth-Token': localStorage.getItem('token'),
    'content-type': 'application/json'
  }

  return axios
    .post(url(route), data, { headers })
    .then(res => res.data)
}

export async function put(route, data) {
  const headers = {
    'X-Auth-Token': localStorage.getItem('token'),
    'content-type': 'application/json'
  }

  return axios
    .put(url(route), data, { headers })
    .then(res => res.data)
}

export async function remove(route, config) {
  const headers = {
    'X-Auth-Token': localStorage.getItem('token'),
    'content-type': 'application/json'
  }

  return axios
    .delete(url(route), { ...config, headers })
    .then(res => res.data)
}
