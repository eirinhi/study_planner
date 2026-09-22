import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import SubjectForm from '../components/SubjectForm';
import TaskForm from '../components/TaskForm';
import { getSubjects, getTasks, saveSubjects, saveTasks } from '../storage/taskStorage';
import { Subject, Task } from '../types/models';

export default function Index() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
      getSubjects().then((loaded) => {
        setSubjects((current) => [...loaded, ...current]);
      });

      getTasks().then((loaded) => {
        setTasks((current) => [...loaded, ...current]);
      });
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
        <SubjectForm onAdd={handleAddSubject} />
        {subjects.map((s) => (
          <Text key={s.id}>{s.name}</Text>
        ))}

        <TaskForm subjects={subjects} onAdd={handleAddTask} />
        {tasks.map((t) => (
          <Text key={t.id}>{t.title} - {t.deadline}</Text>
        ))}
      </View>
    );
}