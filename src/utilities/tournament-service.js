import * as tAPI from './tournament-api';

export async function create(data) {
  const json = {}
  json.name = data
  const tournament = await tAPI.create(json);
  return tournament
}

export function index() {
  return tAPI.index()
}