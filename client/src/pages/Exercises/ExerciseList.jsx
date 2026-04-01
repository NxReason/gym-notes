import { useExercises } from '../../api/useExercises';

export default function ExerciseList() {
  const { data, isLoading } = useExercises();

  if (isLoading) return;

  const items = data.map((ex) => <li key={ex.id}>{ex.name}</li>);
  return <ul>{items}</ul>;
}
