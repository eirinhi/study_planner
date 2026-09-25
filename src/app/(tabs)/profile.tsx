import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius, sharedStyles, spacing, typography } from '../../theme';

export default function Profile() {
    return (
        <ScrollView style={sharedStyles.screen} contentContainerStyle={styles.content}>
            <View style={styles.hero}>
                <View style={styles.avatar}>
                    <Ionicons name='person' size={48} color={colors.primary} />
                </View>
                <Text style={styles.name}>Ola Nordmann</Text>
                <Text style={styles.email}>ola.nordmann@example.com</Text>
            </View>

            <View style={styles.notice}>
                <Ionicons name='information-circle-outline' size={18} color={colors.textSecondary} />
                <Text style={styles.noticeText}>
                    This is a placeholder screen - no functionality implemented yet
                </Text>
            </View>

            <Text style={[sharedStyles.label, styles.sectionTitle]}>Account</Text>
            <View style={sharedStyles.card}>
                <View style={styles.row}>
                    <Ionicons name='person-outline' size={ICON_SIZE} color={colors.textSecondary} />
                    <Text style={styles.rowLabel}>Name</Text>
                    <Text style={styles.rowValue} numberOfLines={1}>Ola Nordmann</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.row}>
                    <Ionicons name='mail-outline' size={ICON_SIZE} color={colors.textSecondary} />
                    <Text style={styles.rowLabel}>Email</Text>
                    <Text style={styles.rowValue} numberOfLines={1}>ola.nordmann@example.com</Text>
                </View>
            </View>

            <Pressable style={({ pressed }) => [sharedStyles.card, styles.logout, pressed && styles.logoutPressed]}>
                <Ionicons name='log-out-outline' size={ICON_SIZE} color={colors.danger} />
                <Text style={styles.logoutText}>Log out</Text>
            </Pressable>
        </ScrollView>
    );
}

const ICON_SIZE = 20;

const styles = StyleSheet.create({
    content: {
        padding: spacing.md,
        paddingBottom: spacing.xl,
        gap: spacing.md,
    },
    hero: {
        alignItems: 'center',
        paddingTop: spacing.lg,
        paddingBottom: spacing.sm,
        gap: spacing.xs,
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
    },
    name: {
        fontSize: typography.heading.fontSize,
        fontWeight: typography.heading.fontWeight,
        color: colors.text,
    },
    email: {
        fontSize: typography.body.fontSize,
        color: colors.textSecondary,
    },
    notice: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        padding: spacing.ms,
        borderRadius: radius.sm,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: colors.border,
    },
    noticeText: {
        flex: 1,
        fontSize: typography.caption.fontSize,
        color: colors.textSecondary,
    },
    sectionTitle: {
        marginBottom: -spacing.sm,
        marginLeft: spacing.xs,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.ms,
        padding: spacing.md,
    },
    rowLabel: {
        fontSize: typography.body.fontSize,
        color: colors.text,
    },
    rowValue: {
        flex: 1,
        textAlign: 'right',
        fontSize: typography.body.fontSize,
        color: colors.textSecondary,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.border,
        marginLeft: 48,
    },
    logout: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.sm,
        paddingVertical: spacing.ms,
        alignItems: 'center',
    },
    logoutPressed: {
        opacity: 0.6,
    },
    logoutText: {
        fontSize: typography.body.fontSize,
        fontWeight: '600',
        color: colors.danger,
    },
});
