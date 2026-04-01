import { useEffect, useRef, useState } from 'react';
import { useDeleteExercise, useUpdateExercise } from '../../api/useExercises';
import { exerciseStore } from './exercisesStore';

export default function ExerciseCard({ id, name, styles }) {
  const deleteExercise = useDeleteExercise();
  const updateExercise = useUpdateExercise();

  const { updatingId, setUpdatingId } = exerciseStore();
  const isUpdating = updatingId === id;

  const [currentName, setName] = useState(name);
  const nameInputRef = useRef(null);

  function handleNameInput(e) {
    setName(e.target.value);
  }

  useEffect(() => {
    if (!isUpdating) return;

    nameInputRef.current.focus();
  }, [isUpdating]);

  function handleUpdClick() {
    setUpdatingId(id);
  }

  function handleCancelClick() {
    setUpdatingId(null);
    setName(name);
  }

  async function handleSaveClick() {
    await updateExercise.mutateAsync({ id, name: currentName });
    setUpdatingId(null);
  }

  function handleDeleteClick() {
    deleteExercise.mutate(id);
  }

  const form = (
    <>
      <input
        type="text"
        className={styles.nameInput}
        value={currentName}
        onInput={handleNameInput}
        ref={nameInputRef}
      />
      <button onClick={handleSaveClick}>S</button>
      <button onClick={handleCancelClick}>C</button>
    </>
  );

  const view = (
    <>
      <span className={styles.cardName}>{name}</span>
      <button onClick={handleUpdClick}>U</button>
      <button onClick={handleDeleteClick}>D</button>
    </>
  );

  return <li className={styles.card}>{isUpdating ? form : view}</li>;
}
