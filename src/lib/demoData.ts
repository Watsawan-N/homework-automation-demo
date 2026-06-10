import { Homework } from './types';
import { runAutomationForList } from './automation';

const formatDate = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0];
};

const createHomework = (
  id: string,
  title: string,
  subject: Homework['subject'],
  dueDate: string,
  difficulty: Homework['difficulty'],
  estimatedMinutes: number,
): Homework => ({
  id,
  title,
  subject,
  dueDate,
  difficulty,
  estimatedMinutes,
  isDone: false,
  status: 'Pending',
  priority: 'Low',
  recommendation: '',
  createdAt: new Date().toISOString(),
});

export const demoHomework: Homework[] = runAutomationForList([
  createHomework('demo-1', 'Math homework', 'Math', formatDate(1), 'Hard', 90),
  createHomework('demo-2', 'English essay', 'English', formatDate(3), 'Medium', 45),
  createHomework('demo-3', 'Science worksheet', 'Science', formatDate(5), 'Easy', 30),
  createHomework('demo-4', 'Thai reading task', 'Thai', formatDate(-1), 'Medium', 40),
]);
