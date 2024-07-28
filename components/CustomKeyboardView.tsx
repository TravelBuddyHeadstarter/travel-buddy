import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

export default function CustomKeyboardView({ children }:any) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex:1}}
        >
            <ScrollView
                style={{ flex: 1, paddingTop: 16 }}
                bounces={false}
                showsVerticalScrollIndicator={false}
                centerContent={true}
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}