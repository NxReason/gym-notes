import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BASE_URL, create, remove, update } from './client';

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
  });
}

export function useUpdateExercise() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      update(`${EXERCISES_URL}/${data.id}`, data).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all() }),
    onError: (err) => console.error(err),
  });
}

export function useDeleteExercise() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => remove(`${EXERCISES_URL}/${id}`).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all() }),
  });
}
