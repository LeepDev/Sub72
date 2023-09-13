import * as tAPI from './tournaments-api';

export function create(data) {
  return tAPI.create(data);
}

export function update(id, data) {
  return tAPI.update(id, data);
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
  return tAPI.addUser(id, data)
}

export function removeUser(id, uId) {
  const data = {}
  data.id = uId
  return tAPI.removeUser(id, data)
}

export function addCourse(id, uId) {
  const data = {}
  data.id = uId
  return tAPI.addCourse(id, data)
}

export function removeCourse(id, uId) {
  const data = {}
  data.id = uId
  return tAPI.removeCourse(id, data)
}