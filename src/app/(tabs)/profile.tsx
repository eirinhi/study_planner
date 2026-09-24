import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
    return (
        <View>
            <Text>Profile</Text>
            <Text>This is a placeholder screen - no functionality implemented yet</Text>
            
            <Ionicons name='person' size={100} color='gray' />
            
            <Text>Name: Ola Nordmann</Text>
            <Text>Email: ola.nordmann@example.com</Text>

            <Pressable>
                <Text>Log out</Text>
            </Pressable>
        </View>
    );
}