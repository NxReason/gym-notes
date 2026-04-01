import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const BASE_URL = 'http://localhost:3000';

export async function create(path, data) {
  return await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
