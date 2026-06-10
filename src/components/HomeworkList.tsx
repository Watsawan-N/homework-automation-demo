import { Homework } from '../lib/types';
import { HomeworkCard } from './HomeworkCard';

interface HomeworkListProps {
  homeworkList: Homework[];
  onMarkDone: (id: string) => void;
  onDelete: (id: string) => void;
}

export function HomeworkList({ homeworkList, onMarkDone, onDelete }: HomeworkListProps) {
  if (homeworkList.length === 0) {
    return (
      <section className="panel empty-state" data-testid="homework-list">
        <h2>No homework yet</h2>
        <p>Add a homework task or load demo data to start exploring the dashboard.</p>
      </section>
    );
  }

  return (
    <section className="homework-list" data-testid="homework-list">
      {homeworkList.map((homework) => (
        <HomeworkCard
          key={homework.id}
          homework={homework}
          onMarkDone={onMarkDone}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}
