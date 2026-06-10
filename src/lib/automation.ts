import { Homework } from './types';

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const getDayDifference = (dueDate: string) => {
  const today = startOfDay(new Date());
  const due = startOfDay(new Date(dueDate));
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  return Math.round((due.getTime() - today.getTime()) / millisecondsPerDay);
};

export const runAutomationForHomework = (homework: Homework): Homework => {
  if (homework.isDone) {
    return {
      ...homework,
      status: 'Done',
      priority: 'Completed',
      recommendation: 'Completed. Great job staying on top of your homework.',
    };
  }

  const dayDifference = getDayDifference(homework.dueDate);

  let status: Homework['status'] = 'Pending';
  let priority: Homework['priority'] = 'Low';

  if (dayDifference < 0) {
    status = 'Overdue';
    priority = 'Critical';
  } else if (dayDifference <= 1) {
    status = 'Urgent';
    priority = 'High';
  } else if (dayDifference <= 3) {
    status = 'Soon';
    priority = 'Medium';
  } else {
    status = 'Normal';
    priority = 'Low';
  }

  let recommendation = 'Not urgent, but you should prepare early.';

  if (homework.difficulty === 'Hard' && homework.estimatedMinutes >= 60) {
    recommendation = 'Split this task into 2 study sessions.';
  }

  if (priority === 'Critical' || priority === 'High') {
    recommendation = 'Do this task today.';
  } else if (priority === 'Medium') {
    recommendation = 'Plan to finish this within 2 days.';
  }

  return {
    ...homework,
    status,
    priority,
    recommendation,
  };
};

export const runAutomationForList = (homeworkList: Homework[]) =>
  homeworkList.map(runAutomationForHomework);
