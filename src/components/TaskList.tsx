import { Ionicons } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';
import { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeOut, LinearTransition } from 'react-native-reanimated';
import { colors, radius, sharedStyles, spacing, typography } from '../theme';
import { Subject, Task } from '../types/models';

type Props = {
    tasks: Task[];
    subjects: Subject[];
    onToggle: (taskId: string) => void;
    header?: ReactElement;
    footer?: ReactElement;
    sortDoneLast?: boolean;
};

export default function TaskList({ tasks, subjects, onToggle, header, footer, sortDoneLast = true }: Props) {
    function getSubjectName(subjectId?: string) {
        if (!subjectId) return undefined;
        return subjects.find((s) => s.id === subjectId)?.name ?? 'Unknown';
    }

    function formatDeadline(deadline: string) {
        const [year, month, day] = deadline.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
    }

    function isOverdue(task: Task) {
        return !task.done && task.deadline < new Date().toLocaleDateString('sv-SE');
    }

    const sortedTasks = [...tasks].sort(
        (a, b) =>
            (sortDoneLast ? Number(a.done) - Number(b.done) : 0) ||
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );

    return (
        <Animated.FlatList
            data={sortedTasks}
            itemLayoutAnimation={LinearTransition.duration(250)}
            keyExtractor={(task) => task.id}
            ListHeaderComponent={header}
            ListFooterComponent={footer}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps='handled'
            keyboardDismissMode='on-drag'
            automaticallyAdjustKeyboardInsets
            ListEmptyComponent={
                <View style={sharedStyles.empty}>
                    <Ionicons name='checkmark-done-circle-outline' size={40} color={colors.textSecondary} />
                    <Text style={sharedStyles.emptyTitle}>All caught up</Text>
                    <Text style={sharedStyles.emptyText}>No tasks here yet.</Text>
                </View>
            }
            renderItem={({ item }) => (
                <Animated.View style={[sharedStyles.card, styles.row]} exiting={FadeOut.duration(250)}>
                    <CheckBox
                        style={styles.checkbox}
                        value={item.done}
                        onValueChange={() => onToggle(item.id)}
                        color={item.done ? colors.primary : undefined}
                        accessibilityLabel={item.title}
                    />
                    <View style={styles.body}>
                        <Text
                            style={[styles.title, item.done && styles.titleDone]}
                            numberOfLines={2}
                        >
                            {item.title}
                        </Text>
                        <View style={styles.meta}>
                            {item.subjectId && (
                                <View style={styles.subjectTag}>
                                    <Text style={styles.subjectText} numberOfLines={1}>
                                        {getSubjectName(item.subjectId)}
                                    </Text>
                                </View>
                            )}
                            <View style={styles.deadline}>
                                <Ionicons name='calendar-outline' size={13} color={isOverdue(item) ? colors.danger : colors.textSecondary} />
                                <Text style={[styles.deadlineText, isOverdue(item) && styles.overdue]}>
                                    {formatDeadline(item.deadline)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: spacing.xl,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: spacing.ms,
        marginHorizontal: spacing.md,
        marginBottom: spacing.sm,
        padding: spacing.md,
    },
    checkbox: {
        marginTop: spacing.xxs,
        borderRadius: 6,
    },
    body: {
        flex: 1,
        gap: spacing.xs,
    },
    title: {
        fontSize: typography.body.fontSize,
        fontWeight: '500',
        color: colors.text,
    },
    titleDone: {
        color: colors.textSecondary,
        textDecorationLine: 'line-through',
    },
    meta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    subjectTag: {
        flexShrink: 1,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xxs,
        borderRadius: radius.full,
        backgroundColor: colors.surface,
    },
    subjectText: {
        fontSize: typography.tiny.fontSize,
        fontWeight: '500',
        color: colors.textSecondary,
    },
    deadline: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    deadlineText: {
        fontSize: typography.caption.fontSize,
        color: colors.textSecondary,
    },
    overdue: {
        color: colors.danger,
        fontWeight: '600',
    },
});
