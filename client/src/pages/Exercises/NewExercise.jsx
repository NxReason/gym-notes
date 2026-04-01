import { useState } from 'react';
import styles from './NewExercise.module.css';
import { useCreateExercise } from '../../api/useExercises';

export default function NewExercise() {
  const createExercise = useCreateExercise();

  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    await createExercise.mutateAsync({ name });
  }

  function handleNameInput(e) {
    setName(e.target.value);
  }

  const form = (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className="form-group">
        <label className={styles.field}>
          <span className={styles.label}>Name</span>
          <input
            type="text"
            className={styles.textInput}
            value={name}
            onInput={handleNameInput}
          />
        </label>
      </div>

      <div className={`form-group ${styles.controls}`}>
        <button>Save</button>
        <button type="button" onClick={() => setIsOpen(false)}>
          Close
        </button>
      </div>
    </form>
  );

  const closedView = (
    <button onClick={() => setIsOpen(true)}>Add exercise</button>
  );

  return <div className={styles.container}>{isOpen ? form : closedView}</div>;
}
