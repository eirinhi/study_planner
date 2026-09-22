import { useState } from "react";
import { 
    View,
    Text,
    TextInput,
    Pressable
} from "react-native";
import { Subject } from "../types/models";

type Props = {
    onAdd: (subject: Subject) => void;
};

export default function SubjectForm({ onAdd }: Props) {
    const [name, setName] = useState('');

    function handleAdd() {
        if (name.trim() === '') return;
        onAdd({ id: Date.now().toString(), name: name.trim() });
        setName('');
    }

    return (
        <View>
            <TextInput
                placeholder="Subject name"
                value={name}
                onChangeText={setName}
            />
            <Pressable onPress={handleAdd}>
                <Text>Add</Text>
            </Pressable>
        </View>
    );
}