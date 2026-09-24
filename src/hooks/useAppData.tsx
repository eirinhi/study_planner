import { useState, useEffect } from 'react';
import { Subject, Task } from '../types/models';
import { getSubjects, saveSubjects, getTasks, saveTasks } from '../storage/taskStorage';

export function useAppData() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    const [loaded, setLoaded] = useState(false);

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

    return { subjects, tasks, loaded, handleAddSubject, handleAddTask, handleToggleTask };
}