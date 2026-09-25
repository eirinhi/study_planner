import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import TaskForm from '../../../components/TaskForm';
import TaskList from '../../../components/TaskList';
import { useAppData } from '../../../hooks/useAppData';
import { colors, radius, sharedStyles, spacing, typography } from '../../../theme';

export default function SubjectDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { subjects, tasks, handleAddTask, handleToggleTask} = useAppData();
    const navigation = useNavigation();
    const router = useRouter();

    const subject = subjects.find((s) => s.id === id);
    const subjectTask = tasks.filter((t) => t.subjectId === id);
    const doneCount = subjectTask.filter((t) => t.done).length;
    const progress = subjectTask.length > 0 ? doneCount / subjectTask.length : 0;

    useEffect(() => {
        navigation.setOptions({
            title: subject?.name ?? 'Subject',
            headerLeft: () => (
                <Pressable
                    style={({ pressed }) => [styles.back, pressed && styles.backPressed]}
                    onPress={() => router.navigate('/subjects')}
                >
                    <Ionicons name='chevron-back' size={22} color={colors.primary} />
                    <Text style={styles.backText}>Subjects</Text>
                </Pressable>
            ),
        });
    }, [navigation, router, subject]);

    if (!subject) return null;

    const header = (
        <View>
            <View style={[sharedStyles.card, styles.summary]}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>
                        {subjectTask.length === 0
                            ? 'No tasks yet'
                            : `${doneCount} of ${subjectTask.length} tasks done`}
                    </Text>
                    {subjectTask.length > 0 && (
                        <Text style={styles.summaryPercent}>{Math.round(progress * 100)}%</Text>
                    )}
                </View>
                <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                </View>
            </View>

            <View style={sharedStyles.sectionHeader}>
                <Text style={sharedStyles.sectionTitle}>New task</Text>
            </View>
            <TaskForm subjects={[subject]} onAdd={handleAddTask} hideSubjectPicker />

            <View style={sharedStyles.sectionHeader}>
                <Text style={sharedStyles.sectionTitle}>Tasks</Text>
            </View>
        </View>
    );

    return (
        <View style={sharedStyles.screen}>
            <TaskList
                tasks={subjectTask}
                subjects={subjects}
                onToggle={handleToggleTask}
                header={header}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    back: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: spacing.sm,
    },
    backPressed: {
        opacity: 0.5,
    },
    backText: {
        fontSize: typography.body.fontSize,
        color: colors.primary,
    },
    summary: {
        gap: spacing.sm,
        margin: spacing.md,
        marginBottom: 0,
        padding: spacing.md,
    },
    summaryRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
    },
    summaryText: {
        fontSize: typography.body.fontSize,
        fontWeight: '500',
        color: colors.text,
    },
    summaryPercent: {
        fontSize: typography.caption.fontSize,
        fontWeight: '600',
        color: colors.primary,
    },
    progressTrack: {
        height: 6,
        borderRadius: radius.full,
        overflow: 'hidden',
        backgroundColor: colors.surface,
    },
    progressFill: {
        height: '100%',
        borderRadius: radius.full,
        backgroundColor: colors.primary,
    },
});
