import * as tAPI from './tournament-api';

export async function create(data) {
  const tournament = await tAPI.create(data);
  return tournament
}