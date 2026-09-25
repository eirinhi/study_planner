import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, sharedStyles, spacing } from '../theme';
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
        <View style={[sharedStyles.card, sharedStyles.shadow, styles.card]}>
            <View style={sharedStyles.field}>
                <Text style={sharedStyles.label}>Subject name</Text>
                <TextInput
                    style={sharedStyles.input}
                    placeholder="e.g. Mathematics"
                    placeholderTextColor={colors.textSecondary}
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <Pressable
                style={({ pressed }) => [sharedStyles.button, pressed && sharedStyles.buttonPressed]}
                onPress={handleAdd}
            >
                <Text style={sharedStyles.buttonText}>Add subject</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        gap: spacing.md,
        margin: spacing.md,
        padding: spacing.md,
    },
});
