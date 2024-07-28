import { ActivityIndicator, View } from "react-native";
import { StyleSheet } from 'react-native';

export default function StartPage() {
    return (
        <View style={styles.loadingPage}>
            <ActivityIndicator size='large' color='gray' />
        </View>
    )
}

const styles = StyleSheet.create({
    loadingPage: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    }
})