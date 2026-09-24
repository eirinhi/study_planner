import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import SubjectForm from '../../components/SubjectForm';
import TaskForm from '../../components/TaskForm';
import { getSubjects, getTasks, saveSubjects, saveTasks } from '../../storage/taskStorage';
import { Subject, Task } from '../../types/models';
import TaskList from '../../components/TaskList';

export default function Index() {
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

    return (
      <View>
        {loaded && <SubjectForm onAdd={handleAddSubject} />}
        {subjects.map((s) => (
          <Text key={s.id}>{s.name}</Text>
        ))}

        {loaded && <TaskForm subjects={subjects} onAdd={handleAddTask} />}
        <TaskList tasks={tasks} subjects={subjects} onToggle={handleToggleTask}/>
      </View>
    );
}