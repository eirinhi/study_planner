import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useAppData } from '../../../hooks/useAppData';
import TaskForm from '../../../components/TaskForm';
import TaskList from '../../../components/TaskList';

export default function SubjectDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { subjects, tasks, handleAddTask, handleToggleTask} = useAppData();
    const navigation = useNavigation();

    const subject = subjects.find((s) => s.id === id);
    const subjectTask = tasks.filter((t) => t.subjectId === id);

    useEffect(() => {
        navigation.setOptions({ title: subject?.name ?? 'Subject'});
    }, [subject]);

    return (
        <View>
            <Text>{subject?.name ?? 'Unknown subject'}</Text>
            <TaskForm subjects={subjects} onAdd={handleAddTask} />
            <TaskList tasks={subjectTask} subjects={subjects} onToggle={handleToggleTask} />
        </View>
    );
}