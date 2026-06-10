export const subjects = ['Math', 'Science', 'English', 'Thai', 'Social', 'Art'] as const;
export const difficulties = ['Easy', 'Medium', 'Hard'] as const;

export type Subject = (typeof subjects)[number];
export type Difficulty = (typeof difficulties)[number];
export type HomeworkStatus = 'Pending' | 'Normal' | 'Soon' | 'Urgent' | 'Overdue' | 'Done';
export type HomeworkPriority = 'Low' | 'Medium' | 'High' | 'Critical' | 'Completed';

export interface Homework {
  id: string;
  title: string;
  subject: Subject;
  dueDate: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  isDone: boolean;
  status: HomeworkStatus;
  priority: HomeworkPriority;
  recommendation: string;
  createdAt: string;
}

export interface HomeworkFormValues {
  title: string;
  subject: Subject;
  dueDate: string;
  difficulty: Difficulty;
  estimatedMinutes: string;
}
