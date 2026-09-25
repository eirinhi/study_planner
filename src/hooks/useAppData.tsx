import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Subject, Task } from '../types/models';
import { getSubjects, saveSubjects, getTasks, saveTasks } from '../storage/taskStorage';
import { useToast } from '../components/Toast';

type AppData = {
    subjects: Subject[];
    tasks: Task[];
    loaded: boolean;
    handleAddSubject: (subject: Subject) => void;
    handleAddTask: (task: Task) => void;
    handleToggleTask: (taskId: string) => void;
};

const AppDataContext = createContext<AppData | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loaded, setLoaded] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
      Promise.all([getSubjects(), getTasks()])
        .then(([loadedSubjects, loadedTasks]) => {
          setSubjects(loadedSubjects);
          setTasks(loadedTasks);
        })
        .catch(() => {})
        .finally(() => setLoaded(true));
    }, []);

    async function handleAddSubject(subject: Subject) {
      let updated: Subject[] = [];
      setSubjects((current) => {
        updated = [...current, subject];
        return updated;
      })
      try {
        await saveSubjects(updated);
        showToast(`Subject "${subject.name}" added`);
      } catch (error) {
        setSubjects((current) => current.filter((s) => s.id !== subject.id));
      }
    }
    
    async function handleAddTask(task: Task) {
      let updated: Task[] = [];
      setTasks((current) => {
        updated = [...current, task];
        return updated;
      })
      try {
        await saveTasks(updated);
        showToast('Task added');
      } catch (error) {
        setTasks((current) => current.filter((t) => t.id !== task.id));
      }
    }

    async function handleToggleTask(taskId: string) {
      const previous = tasks;
      const updated = previous.map((t) =>
        t.id === taskId ? { ...t, done: !t.done } : t
      );
      setTasks(updated);
      try {
        await saveTasks(updated);
      } catch (error) {
        setTasks(previous);
      }
    }

    return (
        <AppDataContext.Provider
            value={{ subjects, tasks, loaded, handleAddSubject, handleAddTask, handleToggleTask }}
        >
            {children}
        </AppDataContext.Provider>
    );
}

export function useAppData() {
    const context = useContext(AppDataContext);
    if (!context) {
        throw new Error('useAppData must be used within an AppDataProvider');
    }
    return context;
}