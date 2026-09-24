import { View, Text, FlatList } from 'react-native';
import { Task, Subject } from '../types/models';
import CheckBox from 'expo-checkbox';

type Props = {
    tasks: Task[];
    subjects: Subject[];
    onToggle: (taskId: string) => void;
};

export default function TaskList({ tasks, subjects, onToggle }: Props) {
    function getSubjectName(subjectId: string) {
        return subjects.find((s) => s.id === subjectId)?.name ?? 'Unknown';
    }

    return (
        <FlatList
            data={tasks}
            keyExtractor={(task) => task.id}
            renderItem={({ item }) => (
                <View>
                    <CheckBox
                        value={item.done}
                        onValueChange={() => onToggle(item.id)}
                        accessibilityLabel={item.title}
                    />
                    <Text>{item.title}</Text>
                    <Text>{getSubjectName(item.subjectId)}</Text>
                    <Text>{item.deadline}</Text>
                </View>
            )}
        />
    );
}
