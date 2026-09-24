import AsyncStorage from '@react-native-async-storage/async-storage';
import { Subject, Task } from '../types/models';

const SUBJECTS_KEY = 'subjects';
const TASKS_KEY = 'tasks';


export async function saveSubjects(subjects: Subject[]): Promise<void> {
    await AsyncStorage.setItem(SUBJECTS_KEY, JSON.stringify(subjects));
}

export async function getSubjects(): Promise<Subject[]> {
    const data = await AsyncStorage.getItem(SUBJECTS_KEY);
    return data ? JSON.parse(data) : [];
}

export async function updateSubject(updatedSubject: Subject): Promise<Subject[]> {
    const subjects = await getSubjects();
    const updated = subjects.map((s) =>
        s.id === updatedSubject.id ? updatedSubject : s
    );
    await saveSubjects(updated);
    return updated;
}

export async function deleteSubject(subjectId: string): Promise<Subject[]> {
    const subjects = await getSubjects();
    const updated = subjects.filter((s) => s.id !== subjectId);
    await saveSubjects(updated);
    return updated;
}

export async function saveTasks(tasks: Task[]): Promise<void> {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export async function getTasks(): Promise<Task[]> {
    const data = await AsyncStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
}

export async function updateTask(updatedTask: Task): Promise<Task[]> {
    const tasks = await getTasks();
    const updated = tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
    );
    await saveTasks(updated);
    return updated;
}

export async function deleteTask(taskId: string): Promise<Task[]> {
    const tasks = await getTasks();
    const updated = tasks.filter((t) => t.id !== taskId);
    await saveTasks(updated);
    return updated;
}