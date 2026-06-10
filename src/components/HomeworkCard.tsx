import { Homework } from '../lib/types';

interface HomeworkCardProps {
  homework: Homework;
  onMarkDone: (id: string) => void;
  onDelete: (id: string) => void;
}

export function HomeworkCard({ homework, onMarkDone, onDelete }: HomeworkCardProps) {
  return (
    <article data-testid="homework-card" className="homework-card">
      <div className="homework-card__header">
        <div>
          <h3>{homework.title}</h3>
          <p>
            {homework.subject} • Due {homework.dueDate}
          </p>
        </div>
        <div className="badge-group">
          <span data-testid="priority-badge" className={`badge badge-${homework.priority.toLowerCase()}`}>
            {homework.priority}
          </span>
          <span data-testid="status-badge" className={`badge badge-status-${homework.status.toLowerCase()}`}>
            {homework.status}
          </span>
        </div>
      </div>

      <dl className="details-grid">
        <div>
          <dt>Difficulty</dt>
          <dd>{homework.difficulty}</dd>
        </div>
        <div>
          <dt>Estimated time</dt>
          <dd>{homework.estimatedMinutes} minutes</dd>
        </div>
      </dl>

      <div className="recommendation-box">
        <strong>Recommendation</strong>
        <p data-testid="recommendation-text">{homework.recommendation || 'Run automation to see a recommendation.'}</p>
      </div>

      <div className="card-actions">
        <button
          data-testid="mark-done-button"
          className="secondary-button"
          type="button"
          onClick={() => onMarkDone(homework.id)}
          disabled={homework.isDone}
        >
          {homework.isDone ? 'Completed' : 'Mark as Done'}
        </button>
        <button
          data-testid="delete-button"
          className="ghost-button"
          type="button"
          onClick={() => onDelete(homework.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
