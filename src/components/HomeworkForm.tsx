import { ChangeEvent, FormEvent } from 'react';
import { difficulties, HomeworkFormValues, subjects } from '../lib/types';

interface HomeworkFormProps {
  formValues: HomeworkFormValues;
  onChange: <K extends keyof HomeworkFormValues>(field: K, value: HomeworkFormValues[K]) => void;
  onSubmit: () => void;
}

const fieldLabels: Record<keyof HomeworkFormValues, string> = {
  title: 'Homework title',
  subject: 'Subject',
  dueDate: 'Due date',
  difficulty: 'Difficulty',
  estimatedMinutes: 'Estimated minutes',
};

export function HomeworkForm({ formValues, onChange, onSubmit }: HomeworkFormProps) {
  const handleInputChange =
    (field: keyof HomeworkFormValues) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange(field, event.target.value as HomeworkFormValues[typeof field]);
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <h2>Add Homework</h2>
        <p>Create homework tasks, then run automation to see which work needs attention first.</p>
      </div>

      <label className="field">
        <span>{fieldLabels.title}</span>
        <input
          data-testid="homework-title-input"
          type="text"
          placeholder="Example: Algebra worksheet"
          value={formValues.title}
          onChange={handleInputChange('title')}
          required
        />
      </label>

      <div className="field-grid">
        <label className="field">
          <span>{fieldLabels.subject}</span>
          <select
            data-testid="subject-select"
            value={formValues.subject}
            onChange={handleInputChange('subject')}
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>{fieldLabels.dueDate}</span>
          <input
            data-testid="due-date-input"
            type="date"
            value={formValues.dueDate}
            onChange={handleInputChange('dueDate')}
            required
          />
        </label>
      </div>

      <div className="field-grid">
        <label className="field">
          <span>{fieldLabels.difficulty}</span>
          <select
            data-testid="difficulty-select"
            value={formValues.difficulty}
            onChange={handleInputChange('difficulty')}
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>{fieldLabels.estimatedMinutes}</span>
          <input
            data-testid="estimated-minutes-input"
            type="number"
            min="1"
            placeholder="45"
            value={formValues.estimatedMinutes}
            onChange={handleInputChange('estimatedMinutes')}
            required
          />
        </label>
      </div>

      <button data-testid="add-homework-button" className="primary-button" type="submit">
        Add Homework
      </button>
    </form>
  );
}
