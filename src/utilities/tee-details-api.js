import sendRequest from "./send-request";

const BASE_URL = '/api/teeDetails';

export async function findByCourse(id) {
  return sendRequest(`${BASE_URL}/course/${id}`)
}