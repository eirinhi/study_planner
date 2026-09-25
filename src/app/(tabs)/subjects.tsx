import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import SubjectForm from '../../components/SubjectForm';
import { useAppData } from '../../hooks/useAppData';
import { colors, radius, sharedStyles, spacing, typography } from '../../theme';

const COLUMNS = 3;

export default function Subjects() {
    const { subjects, loaded, handleAddSubject } = useAppData();
    const router = useRouter();

    return (
        <View style={sharedStyles.screen}>
            <FlatList
                data={subjects}
                keyExtractor={(s) => s.id}
                numColumns={COLUMNS}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps='handled'
                keyboardDismissMode='on-drag'
                automaticallyAdjustKeyboardInsets
                ListHeaderComponent={
                    <View>
                        {loaded && <SubjectForm onAdd={handleAddSubject} />}
                        <View style={sharedStyles.sectionHeader}>
                            <Text style={sharedStyles.sectionTitle}>Your subjects</Text>
                            {subjects.length > 0 && (
                                <Text style={sharedStyles.sectionCaption}>{subjects.length} total</Text>
                            )}
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <View style={sharedStyles.empty}>
                        <Ionicons name='folder-open-outline' size={40} color={colors.textSecondary} />
                        <Text style={sharedStyles.emptyTitle}>No subjects yet</Text>
                        <Text style={sharedStyles.emptyText}>Add your first subject above.</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <Pressable
                        style={({ pressed }) => [styles.tile, pressed && styles.tilePressed]}
                        onPress={() => router.push(`/subject/${item.id}`)}
                    >
                        <Ionicons name='folder' size={64} color={colors.primary} />
                        <Text style={styles.tileName} numberOfLines={2}>
                            {item.name}
                        </Text>
                    </Pressable>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: spacing.xl,
    },
    tile: {
        width: `${100 / COLUMNS}%`,
        alignItems: 'center',
        gap: spacing.xs,
        paddingVertical: spacing.ms,
        paddingHorizontal: spacing.xs,
        borderRadius: radius.md,
    },
    tilePressed: {
        backgroundColor: colors.border,
    },
    tileName: {
        fontSize: typography.small.fontSize,
        fontWeight: '500',
        color: colors.text,
        textAlign: 'center',
    },
});
