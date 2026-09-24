import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='home' color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name='subjects'
                options={{
                    title: 'Subjects',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='folder' color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='person' color={color} size={size} />
                    ),
                }}
            />   
        </Tabs>
    );
};