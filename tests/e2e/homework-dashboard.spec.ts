import { expect, Page, test } from '@playwright/test';

const createFutureDate = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0];
};

const addHomework = async (
  page: Page,
  options: {
    title: string;
    subject?: string;
    dueDate: string;
    difficulty?: string;
    estimatedMinutes: string;
  },
) => {
  await page.getByTestId('homework-title-input').fill(options.title);
  await page.getByTestId('subject-select').selectOption(options.subject ?? 'Math');
  await page.getByTestId('due-date-input').fill(options.dueDate);
  await page.getByTestId('difficulty-select').selectOption(options.difficulty ?? 'Easy');
  await page.getByTestId('estimated-minutes-input').fill(options.estimatedMinutes);
  await page.getByTestId('add-homework-button').click();
};

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.localStorage.clear();
  });
  await page.reload();
});

test('should display app title', async ({ page }) => {
  await expect(page.getByTestId('app-title')).toHaveText('Homework Automation Dashboard');
});

test('should add a new homework item', async ({ page }) => {
  await page.getByTestId('clear-all-button').click();

  await addHomework(page, {
    title: 'Geometry quiz review',
    dueDate: createFutureDate(2),
    difficulty: 'Medium',
    estimatedMinutes: '50',
  });

  await expect(page.getByTestId('homework-list')).toContainText('Geometry quiz review');
});

test('should run automation and set high priority for homework due tomorrow', async ({ page }) => {
  await addHomework(page, {
    title: 'Math practice set',
    dueDate: createFutureDate(1),
    difficulty: 'Hard',
    estimatedMinutes: '90',
  });

  await page.getByTestId('run-automation-button').click();

  const card = page.getByTestId('homework-card').filter({ hasText: 'Math practice set' });
  await expect(card.getByTestId('priority-badge')).toHaveText('High');
  await expect(card.getByTestId('status-badge')).toHaveText('Urgent');
});

test('should set critical priority for overdue homework', async ({ page }) => {
  await addHomework(page, {
    title: 'Thai summary',
    dueDate: createFutureDate(-1),
    difficulty: 'Medium',
    estimatedMinutes: '40',
  });

  await page.getByTestId('run-automation-button').click();

  const card = page.getByTestId('homework-card').filter({ hasText: 'Thai summary' });
  await expect(card.getByTestId('priority-badge')).toHaveText('Critical');
  await expect(card.getByTestId('status-badge')).toHaveText('Overdue');
});

test('should set low priority for homework due after 5 days', async ({ page }) => {
  await addHomework(page, {
    title: 'Science worksheet',
    dueDate: createFutureDate(5),
    difficulty: 'Easy',
    estimatedMinutes: '30',
  });

  await page.getByTestId('run-automation-button').click();

  const card = page.getByTestId('homework-card').filter({ hasText: 'Science worksheet' });
  await expect(card.getByTestId('priority-badge')).toHaveText('Low');
  await expect(card.getByTestId('status-badge')).toHaveText('Normal');
});

test('should mark homework as done', async ({ page }) => {
  await addHomework(page, {
    title: 'English reading',
    dueDate: createFutureDate(2),
    difficulty: 'Easy',
    estimatedMinutes: '25',
  });

  const card = page.getByTestId('homework-card').filter({ hasText: 'English reading' });
  await card.getByTestId('mark-done-button').click();

  await expect(card.getByTestId('priority-badge')).toHaveText('Completed');
  await expect(card.getByTestId('status-badge')).toHaveText('Done');
});

test('should delete homework', async ({ page }) => {
  await addHomework(page, {
    title: 'Art color study',
    dueDate: createFutureDate(4),
    difficulty: 'Easy',
    estimatedMinutes: '20',
  });

  const card = page.getByTestId('homework-card').filter({ hasText: 'Art color study' });
  await card.getByTestId('delete-button').click();

  await expect(page.getByTestId('homework-list')).not.toContainText('Art color study');
});

test('should persist homework after page reload', async ({ page }) => {
  await addHomework(page, {
    title: 'Social studies presentation',
    dueDate: createFutureDate(3),
    difficulty: 'Medium',
    estimatedMinutes: '55',
  });

  await page.reload();

  await expect(page.getByTestId('homework-list')).toContainText('Social studies presentation');
});


test('should display all text', async ({ page }) => {
  await expect(page.getByTestId('app-title')).toHaveText('Homework Automation Dashboard');
  await page.goto('http://localhost:5175/');

  await page.getByTestId('homework-title-input').click();
  await page.getByTestId('homework-title-input').fill('test homework');
  await page.getByTestId('subject-select').selectOption('Science');
  await page.getByTestId('due-date-input').fill('2026-06-11');
  await page.getByTestId('difficulty-select').selectOption('Hard');
  await page.getByTestId('due-date-input').fill('2026-06-27');
  await page.getByTestId('estimated-minutes-input').click();
  await page.getByTestId('estimated-minutes-input').dblclick();
  await page.getByTestId('estimated-minutes-input').fill('50');
});