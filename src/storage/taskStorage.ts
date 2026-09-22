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

export async function saveTasks(tasks: Task[]): Promise<void> {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export async function getTasks(): Promise<Task[]> {
    const data = await AsyncStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
}