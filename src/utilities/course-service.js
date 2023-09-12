import * as cAPI from './course-api';

export async function create(data) {
  const json = {}
  json.name = data
  const course = await cAPI.create(json);
  return course
}

export async function deleteOne(id) {
  const course = await cAPI.deleteOne(id);
  return course
}

export function index() {
  return cAPI.index()
}