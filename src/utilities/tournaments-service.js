import * as tAPI from './tournaments-api';

export function create(data) {
  const json = {}
  json.name = data
  return tAPI.create(json);
}

export function deleteOne(id) {
  return tAPI.deleteOne(id);
}

export function index() {
  return tAPI.index()
}

export function findOne(id) {
  return tAPI.findOne(id);
}

export function addUser(id, uId) {
  const data = {}
  data.id = uId
  tAPI.addUser(id, data)
}

export function removeUser(id, uId) {
  const data = {}
  data.id = uId
  tAPI.removeUser(id, data)
}

export function addCourse(id, uId) {
  const data = {}
  data.id = uId
  tAPI.addCourse(id, data)
}

export function removeCourse(id, uId) {
  const data = {}
  data.id = uId
  tAPI.removeCourse(id, data)
}