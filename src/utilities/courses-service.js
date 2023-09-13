import * as cAPI from './courses-api';

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

export function findOne(id) {
  return cAPI.findOne(id);
}