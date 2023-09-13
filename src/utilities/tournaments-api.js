import sendRequest from "./send-request";

const BASE_URL = '/api/tournaments';

export async function create(data) {
  return sendRequest(BASE_URL, 'POST', data)
}

export async function update(id, data) {
  return sendRequest(`${BASE_URL}/${id}`, 'POST', data)
}

export async function deleteOne(id) {
  return sendRequest(`${BASE_URL}/delete/${id}`, 'POST')
}

export async function index() {
  return sendRequest(`${BASE_URL}`)
}

export async function findOne(id) {
  return sendRequest(`${BASE_URL}/${id}`)
}

export async function addUser(id, data) {
  return sendRequest(`${BASE_URL}/addUser/${id}`, 'POST', data)
}

export async function removeUser(id, data) {
  return sendRequest(`${BASE_URL}/removeUser/${id}`, 'POST', data)
}

export async function addCourse(id, data) {
  return sendRequest(`${BASE_URL}/addCourse/${id}`, 'POST', data)
}

export async function removeCourse(id, data) {
  return sendRequest(`${BASE_URL}/removeCourse/${id}`, 'POST', data)
}