import { useExercises } from '../../api/useExercises';
import ExerciseList from './ExerciseList';
import NewExercise from './NewExercise';

export default function Exercises() {
  const { isLoading, error } = useExercises();

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div>
      <h1>Exercises</h1>
      <NewExercise />
      <ExerciseList />
    </div>
  );
}
