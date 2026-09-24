import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, sharedStyles, spacing, typography } from '../theme';
import { Subject, Task } from '../types/models';

type Props = {
    subjects: Subject[];
    onAdd: (task: Task) => void;
    hideSubjectPicker?: boolean;
};

export default function TaskForm({ subjects, onAdd, hideSubjectPicker = false }: Props) {
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [selectedSubjectId, setSelectedSubjectId] = useState('');
    const subjectId = hideSubjectPicker ? subjects[0]?.id ?? '' : selectedSubjectId;
    const canAdd = title.trim() !== '' && (!hideSubjectPicker || subjectId !== '');

    function handleAdd() {
        if (!canAdd) return;
        onAdd({
            id: Date.now().toString(),
            title: title.trim(),
            deadline: `${deadline.getFullYear()}-${String(deadline.getMonth() + 1).padStart(2, '0')}-${String(deadline.getDate()).padStart(2, '0')}`,
            done: false,
            subjectId: subjectId || undefined,
        });
        setTitle('');
    } 
    
    
    return (
        <View style={[sharedStyles.card, sharedStyles.shadow, styles.card]}>
            <View style={sharedStyles.field}>
                <Text style={sharedStyles.label}>Title</Text>
                <TextInput
                    style={sharedStyles.input}
                    placeholder='What needs to be done?'
                    placeholderTextColor={colors.textSecondary}
                    value={title}
                    onChangeText={setTitle}
                />
            </View>

            <View style={styles.deadlineRow}>
                <Text style={sharedStyles.label}>Deadline</Text>
                <DateTimePicker
                    value={deadline}
                    mode='date'
                    onChange={(event: DateTimePickerEvent, selectedDate?: Date) => selectedDate && setDeadline(selectedDate)}
                />
            </View>

            {!hideSubjectPicker && (
                <View style={sharedStyles.field}>
                    <Text style={sharedStyles.label}>Subject</Text>
                    <View style={styles.chipRow}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.chip,
                                subjectId === '' && styles.chipSelected,
                                pressed && styles.chipPressed,
                            ]}
                            onPress={() => setSelectedSubjectId('')}
                        >
                            <Text style={[styles.chipText, subjectId === '' && styles.chipTextSelected]}>
                                No subject
                            </Text>
                        </Pressable>
                        {subjects.map((s) => {
                            const selected = s.id === subjectId;
                            return (
                                <Pressable
                                    key={s.id}
                                    style={({ pressed }) => [
                                        styles.chip,
                                        selected && styles.chipSelected,
                                        pressed && styles.chipPressed,
                                    ]}
                                    onPress={() => setSelectedSubjectId(s.id)}
                                >
                                    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                                        {s.name}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            )}

            <Pressable
                style={({ pressed }) => [
                    sharedStyles.button,
                    styles.button,
                    pressed && sharedStyles.buttonPressed,
                    !canAdd && sharedStyles.buttonDisabled,
                ]}
                onPress={handleAdd}
                disabled={!canAdd}
            >
                <Text style={sharedStyles.buttonText}>Add task</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        gap: spacing.md,
        marginHorizontal: spacing.md,
        marginBottom: spacing.md,
        padding: spacing.md,
    },
    deadlineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    chip: {
        paddingHorizontal: spacing.ms,
        paddingVertical: spacing.xs,
        borderRadius: radius.full,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },
    chipSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.background,
    },
    chipPressed: {
        opacity: 0.6,
    },
    chipText: {
        fontSize: typography.small.fontSize,
        color: colors.text,
    },
    chipTextSelected: {
        color: colors.primary,
        fontWeight: '600',
    },
    button: {
        marginTop: spacing.xs,
    },
});
