import { View, Text } from 'react-native';
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
        <View>
            {tasks.map((t) => (
                <View key={t.id}>
                    <Text>{t.title}</Text>
                    <Text>{getSubjectName(t.subjectId)}</Text>
                    <Text>{t.deadline}</Text>
                </View>
            ))}
        </View>
    );
}
