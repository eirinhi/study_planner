import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Task, Subject } from '../types/models';

type Props = {
    subjects: Subject[];
    onAdd: (task: Task) => void;
};

export default function TaskForm({ subjects, onAdd }: Props) {
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [subjectId, setSubjectId] = useState(subjects[0]?.id ?? '');

    function handleAdd() {
        if (title.trim() === '' || subjectId === '') return;
        onAdd({
            id: Date.now().toString(),
            title: title.trim(),
            deadline: `${deadline.getFullYear()}-${String(deadline.getMonth() + 1).padStart(2, '0')}-${String(deadline.getDate()).padStart(2, '0')}`,
            done: false,
            subjectId,
        });
        setTitle('');
    } 
    
    
    return (
        <View>
            <TextInput
                placeholder='Task title'
                value={title}
                onChangeText={setTitle}
            />
            <DateTimePicker
                value={deadline}
                mode='date'
                onChange={(event: DateTimePickerEvent, selectedDate?: Date) => selectedDate && setDeadline(selectedDate)}
            />
            {subjects.map((s) => (
                <Pressable key={s.id} onPress={() => setSubjectId(s.id)}>
                <Text>{s.id === subjectId ? 'OK' : ''}{s.name}</Text>
                </Pressable>
            ))}
            <Pressable onPress={handleAdd}>
                <Text>Add</Text>
            </Pressable>
        </View>
    );
}
