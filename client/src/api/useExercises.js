import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BASE_URL, create } from './client';

const EXERCISES_URL = BASE_URL + '/api/exercises';

const keys = {
  all() {
    return ['exercises'];
  },
};

export function useExercises() {
  return useQuery({
    queryKey: keys.all(),
    queryFn: () => fetch(EXERCISES_URL).then((r) => r.json()),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateExercise() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => create(EXERCISES_URL, data).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all() }),
    delay: 1000,
  });
}
