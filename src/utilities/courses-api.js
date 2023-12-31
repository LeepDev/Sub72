import sendRequest from "./send-request";

const BASE_URL = '/api/courses';

export async function create(data) {
  return sendRequest(BASE_URL, 'POST', data)
}

export async function deleteOne(id) {
  return sendRequest(`${BASE_URL}/delete/`+id, 'POST')
}

export async function index() {
  return sendRequest(`${BASE_URL}`)
}

export async function findOne(id) {
  return sendRequest(`${BASE_URL}/${id}`)
}