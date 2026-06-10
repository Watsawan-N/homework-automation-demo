import { useEffect, useMemo, useState } from 'react';
import { HomeworkForm } from './components/HomeworkForm';
import { HomeworkList } from './components/HomeworkList';
import { runAutomationForHomework, runAutomationForList } from './lib/automation';
import { demoHomework } from './lib/demoData';
import { loadHomeworkFromStorage, saveHomeworkToStorage } from './lib/storage';
import { Homework, HomeworkFormValues } from './lib/types';

const createDefaultFormValues = (): HomeworkFormValues => ({
  title: '',
  subject: 'Math',
  dueDate: new Date().toISOString().split('T')[0],
  difficulty: 'Easy',
  estimatedMinutes: '30',
});

const createHomework = (formValues: HomeworkFormValues): Homework => ({
  id: crypto.randomUUID(),
  title: formValues.title.trim(),
  subject: formValues.subject,
  dueDate: formValues.dueDate,
  difficulty: formValues.difficulty,
  estimatedMinutes: Number(formValues.estimatedMinutes),
  isDone: false,
  status: 'Pending',
  priority: 'Low',
  recommendation: '',
  createdAt: new Date().toISOString(),
});

function App() {
  const [formValues, setFormValues] = useState<HomeworkFormValues>(createDefaultFormValues);
  const [homeworkList, setHomeworkList] = useState<Homework[]>(() => loadHomeworkFromStorage());

  useEffect(() => {
    saveHomeworkToStorage(homeworkList);
  }, [homeworkList]);

  const summary = useMemo(() => {
    const completed = homeworkList.filter((homework) => homework.isDone).length;
    const urgent = homeworkList.filter(
      (homework) => homework.priority === 'High' || homework.priority === 'Critical',
    ).length;

    return {
      total: homeworkList.length,
      completed,
      urgent,
    };
  }, [homeworkList]);

  const handleFormChange = <K extends keyof HomeworkFormValues>(
    field: K,
    value: HomeworkFormValues[K],
  ) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const handleAddHomework = () => {
    const nextHomework = runAutomationForHomework(createHomework(formValues));

    setHomeworkList((currentList) => [nextHomework, ...currentList]);
    setFormValues(createDefaultFormValues());
  };

  const handleRunAutomation = () => {
    setHomeworkList((currentList) => runAutomationForList(currentList));
  };

  const handleLoadDemoData = () => {
    setHomeworkList(demoHomework);
  };

  const handleClearAll = () => {
    setHomeworkList([]);
  };

  const handleMarkDone = (id: string) => {
    setHomeworkList((currentList) =>
      currentList.map((homework) =>
        homework.id === id
          ? runAutomationForHomework({
              ...homework,
              isDone: true,
            })
          : homework,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setHomeworkList((currentList) => currentList.filter((homework) => homework.id !== id));
  };

  return (
    <div className="app-shell">
      <header className="hero panel">
        <div>
          <p className="eyebrow">Student Project Demo</p>
          <h1 data-testid="app-title">Homework Automation Dashboard</h1>
          <p className="subtitle">Learn automation with homework tasks</p>
        </div>

        <div className="summary-grid">
          <div className="summary-card">
            <span>Total Tasks</span>
            <strong>{summary.total}</strong>
          </div>
          <div className="summary-card">
            <span>Urgent Today</span>
            <strong>{summary.urgent}</strong>
          </div>
          <div className="summary-card">
            <span>Completed</span>
            <strong>{summary.completed}</strong>
          </div>
        </div>
      </header>

      <main className="content-grid">
        <HomeworkForm formValues={formValues} onChange={handleFormChange} onSubmit={handleAddHomework} />

        <section className="panel automation-panel">
          <div className="panel-heading">
            <h2>Automation Controls</h2>
            <p>Refresh priorities after adding tasks, or load sample data for a classroom demo.</p>
          </div>

          <div className="action-stack">
            <button
              data-testid="run-automation-button"
              className="primary-button"
              type="button"
              onClick={handleRunAutomation}
            >
              Run Automation
            </button>
            <button
              data-testid="load-demo-data-button"
              className="secondary-button"
              type="button"
              onClick={handleLoadDemoData}
            >
              Load Demo Data
            </button>
            <button
              data-testid="clear-all-button"
              className="ghost-button"
              type="button"
              onClick={handleClearAll}
            >
              Clear All Homework
            </button>
          </div>
        </section>
      </main>

      <HomeworkList homeworkList={homeworkList} onMarkDone={handleMarkDone} onDelete={handleDelete} />
    </div>
  );
}

export default App;
