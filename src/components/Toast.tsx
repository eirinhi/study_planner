import { Ionicons } from '@expo/vector-icons';
import { createContext, ReactNode, useContext, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../theme';

const DURATION_MS = 2000;
const TAB_BAR_HEIGHT = 56;

type ToastMessage = {
    id: number;
    text: string;
};

type ToastContextValue = {
    showToast: (text: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toast, setToast] = useState<ToastMessage | null>(null);
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const insets = useSafeAreaInsets();

    function showToast(text: string) {
        if (timeout.current) clearTimeout(timeout.current);
        setToast({ id: Date.now(), text });
        timeout.current = setTimeout(() => setToast(null), DURATION_MS);
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <View
                pointerEvents='none'
                style={[styles.container, { bottom: insets.bottom + TAB_BAR_HEIGHT + spacing.sm }]}
            >
                {toast && (
                    <Animated.View
                        key={toast.id}
                        entering={FadeInDown.duration(200)}
                        exiting={FadeOutDown.duration(200)}
                        style={styles.toast}
                    >
                        <Ionicons name='checkmark-circle' size={20} color={colors.success} />
                        <Text style={styles.text}>{toast.text}</Text>
                    </Animated.View>
                )}
            </View>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    toast: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.ms,
        borderRadius: radius.full,
        backgroundColor: colors.text,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 4,
    },
    text: {
        color: colors.primaryText,
        fontSize: typography.body.fontSize,
        fontWeight: '500',
    },
});
