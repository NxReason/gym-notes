import { useEffect, useRef, useState } from 'react';
import { useDeleteExercise, useUpdateExercise } from '../../api/useExercises';

export default function ExerciseCard({ id, name, styles }) {
  const deleteExercise = useDeleteExercise();
  const updateExercise = useUpdateExercise();

  const [isUpdating, setIsUpdating] = useState(false);
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
    setIsUpdating(true);
  }

  function handleCancelClick() {
    setIsUpdating(false);
    setName(name);
  }

  async function handleSaveClick() {
    await updateExercise.mutateAsync({ id, name: currentName });
    setIsUpdating(false);
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
