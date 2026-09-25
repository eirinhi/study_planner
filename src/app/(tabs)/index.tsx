import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import { useAppData } from '../../hooks/useAppData';
import { colors, sharedStyles, spacing, typography } from '../../theme';

export default function Index() {
    const { subjects, tasks, loaded, handleAddTask, handleToggleTask } = useAppData();
    const [recentlyDone, setRecentlyDone] = useState<string[]>([]);

    function handleToggle(taskId: string) {
        const task = tasks.find((t) => t.id === taskId);
        if (task && !task.done) {
            setRecentlyDone((current) => [...current, taskId]);
            setTimeout(() => {
                setRecentlyDone((current) => current.filter((id) => id !== taskId));
            }, 1200);
        }
        handleToggleTask(taskId);
    }

    function getGreeting() {
        const hour = new Date().getHours();
        return hour < 12 ? 'Good morning!' : hour < 18 ? 'Good afternoon!' : 'Good evening!';
    }

    const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

    const upcomingTasks = [...tasks]
        .filter((t) => !t.done || recentlyDone.includes(t.id))
        .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
        .slice(0, 5);

    const header = (
        <View>
            <View style={styles.hero}>
                <Text style={[sharedStyles.label, styles.date]}>{today}</Text>
                <Text style={styles.greeting}>{getGreeting()}</Text>
            </View>

            <View style={sharedStyles.sectionHeader}>
                <Text style={sharedStyles.sectionTitle}>Upcoming tasks</Text>
                {upcomingTasks.length > 0 && (
                    <Text style={sharedStyles.sectionCaption}>Next {upcomingTasks.length} deadlines</Text>
                )}
            </View>
        </View>
    );

    const footer = (
        <View>
            <View style={sharedStyles.sectionHeader}>
                <Text style={sharedStyles.sectionTitle}>New task</Text>
            </View>
            {loaded && <TaskForm subjects={subjects} onAdd={handleAddTask} />}
        </View>
    );

    return (
        <View style={sharedStyles.screen}>
            <TaskList
                tasks={upcomingTasks}
                subjects={subjects}
                onToggle={handleToggle}
                sortDoneLast={false}
                header={header}
                footer={footer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    hero: {
        paddingHorizontal: spacing.md,
        paddingTop: spacing.lg,
        paddingBottom: spacing.sm,
        gap: spacing.xs,
    },
    date: {
        fontSize: typography.caption.fontSize,
        fontWeight: '600',
        color: colors.primary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    greeting: {
        fontSize: typography.title.fontSize,
        fontWeight: typography.title.fontWeight,
        color: colors.text,
    },
});
