import { useExercises } from '../../api/useExercises';
import ExerciseCard from './ExerciseCard';
import styles from './ExerciseList.module.css';

export default function ExerciseList() {
  const { data, isLoading, isError } = useExercises();

  if (isLoading || isError) return;

  const items = data.map((ex) => (
    <ExerciseCard key={ex.id} styles={styles} {...ex} />
  ));
  return <ul className={styles.container}>{items}</ul>;
}
