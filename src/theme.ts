import { StyleSheet } from 'react-native';

export const colors = {
    background: '#FFFFFF',
    surface: '#F5F5F7',
    text: '#1A1A1A',
    textSecondary: '#6B6B6B',
    border: '#E0E0E0',
    primary: '#3B82F6',
    primaryText: '#FFFFFF',
    danger: '#EF4444',
    success: '#4ADE80',
    shadow: '#000',
    buttonPressed: '#3875d6',
};

export const spacing = {
    xxs: 2,
    xs: 4,
    sm: 8,
    ms: 12,
    md: 16,
    lg: 24,
    xl: 32,
};

export const radius = {
    sm: 8,
    md: 12,
    full: 999,
};

export const typography = {
    title: { fontSize: 30, fontWeight: '700' as const },
    heading: { fontSize: 24, fontWeight: '700' as const },
    subheading: { fontSize: 18, fontWeight: '600' as const },
    body: { fontSize: 16, fontWeight: '400' as const },
    small: { fontSize: 14, fontWeight: '400' as const },
    caption: { fontSize: 13, fontWeight: '400' as const, color: colors.textSecondary },
    tiny: { fontSize: 12, fontWeight: '400' as const },
    selected: { fontWeight: '700' as const},
}

export const sharedStyles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    card: {
        borderRadius: radius.md,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
    },
    shadow: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    field: {
        gap: spacing.xs,
    },
    label: {
        fontSize: typography.caption.fontSize,
        fontWeight: '600',
        color: colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.sm,
        paddingHorizontal: spacing.ms,
        paddingVertical: spacing.ms,
        fontSize: typography.body.fontSize,
        color: colors.text,
        backgroundColor: colors.surface,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: radius.sm,
        paddingVertical: spacing.ms,
        alignItems: 'center',
    },
    buttonPressed: {
        backgroundColor: colors.buttonPressed,
    },
    buttonDisabled: {
        opacity: 0.4,
    },
    buttonText: {
        color: colors.primaryText,
        fontSize: typography.body.fontSize,
        fontWeight: '600',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingTop: spacing.md,
        paddingBottom: spacing.ms,
    },
    sectionTitle: {
        fontSize: typography.subheading.fontSize,
        fontWeight: typography.subheading.fontWeight,
        color: colors.text,
    },
    sectionCaption: {
        fontSize: typography.caption.fontSize,
        color: colors.textSecondary,
    },
    empty: {
        alignItems: 'center',
        gap: spacing.xs,
        marginHorizontal: spacing.md,
        paddingVertical: spacing.xl,
        borderRadius: radius.md,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: colors.border,
    },
    emptyTitle: {
        fontSize: typography.body.fontSize,
        fontWeight: '600',
        color: colors.text,
    },
    emptyText: {
        fontSize: typography.caption.fontSize,
        color: colors.textSecondary,
    },
});
