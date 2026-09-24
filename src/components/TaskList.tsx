import { View, Text, FlatList } from 'react-native';
import { Task, Subject } from '../types/models';

type Props = {
    tasks: Task[];
    subjects: Subject[];
};

export default function TaskList({ tasks, subjects }: Props) {
    function getSubjectName(subjectId: string) {
        return subjects.find((s) => s.id === subjectId)?.name ?? 'Unknown';
    }

    return (
        <FlatList
            data={tasks}
            keyExtractor={(task) => task.id}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.title}</Text>
                    <Text>{getSubjectName(item.subjectId)}</Text>
                    <Text>{item.deadline}</Text>
                </View>
            )}
        />
    );
}
