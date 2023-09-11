import sendRequest from "./send-request";

const BASE_URL = '/api/tournaments';

export async function create(data) {
  return sendRequest(BASE_URL, 'POST', data)
}