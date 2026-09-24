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

    function formatDeadline(deadline: string) {
        const [year, month, day] = deadline.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
    }

    const sortedTasks = [...tasks].sort(
        (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );

    return (
        <FlatList
            data={sortedTasks}
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
                    <Text>{formatDeadline(item.deadline)}</Text>
                </View>
            )}
        />
    );
}
