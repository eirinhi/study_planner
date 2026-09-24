import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import SubjectForm from '../components/SubjectForm';
import TaskForm from '../components/TaskForm';
import { getSubjects, getTasks, saveSubjects, saveTasks } from '../storage/taskStorage';
import { Subject, Task } from '../types/models';

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
      const updated = [...subjects, subject];
      setSubjects(updated);
      try {
        await saveSubjects(updated);
      } catch (error) {
        setSubjects(subjects);
      }
    }
    
    async function handleAddTask(task: Task) {
      const updated = [...tasks, task];
      setTasks(updated);
      try {
        await saveTasks(updated);
      } catch (error) {
        setTasks(tasks);
      }
    }

    return (
      <View>
        {loaded && <SubjectForm onAdd={handleAddSubject} />}
        {subjects.map((s) => (
          <Text key={s.id}>{s.name}</Text>
        ))}

        {loaded && <TaskForm subjects={subjects} onAdd={handleAddTask} />}
        {tasks.map((t) => (
          <Text key={t.id}>{t.title} - {t.deadline}</Text>
        ))}
      </View>
    );
}