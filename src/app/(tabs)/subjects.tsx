import { View, Text, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppData } from '../../hooks/useAppData';
import SubjectForm from '../../components/SubjectForm';

export default function Subjects() {
    const { subjects, loaded, handleAddSubject } = useAppData();
    const router = useRouter();

    return (
        <View>
            {loaded && <SubjectForm onAdd={handleAddSubject}/>}
            <FlatList
                data={subjects}
                keyExtractor={(s) => s.id}
                renderItem={({ item }) => (
                    <Pressable onPress={() => router.push(`/subjects/${item.id}` as any)}>
                        <Text>{item.name}</Text>
                    </Pressable>
                )}
            />
        </View>
    );
}