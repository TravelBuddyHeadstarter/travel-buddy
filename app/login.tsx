import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text, TextInput, Button, Pressable, Alert, ScrollView, KeyboardAvoidingView, StatusBar } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import CustomKeyboardView from '@/components/CustomKeyboardView';
import { useAuth } from '@/context/authContext';

export default function LoginScreen() {


  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const {login} = useAuth();

  // not use state cuz renders on every update
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    setLoading(true);
    console.log(emailRef.current, passwordRef.current)
    if (!emailRef.current || !passwordRef.current) {
      if (Platform.OS === 'web') {
        alert("Please fill all the fields!")
      } else {
        Alert.alert('Sign In', "Please fill all the fields!");
      }
      setLoading(false);
      return;
    }

    // login process
    let response = await login(emailRef.current, passwordRef.current)
    setLoading(false);

    console.log('got result: ', response)
    if (!response.success) {
      if (Platform.OS === 'web') {
        alert(response.msg)
      } else {
        Alert.alert('Sign Up', response.msg)

      }
    } 
  };





  return (
    <CustomKeyboardView>
      {/* <StatusBar style='dark'/> */}
      <View style={styles.inner}>
        <ThemedText type='title' style={styles.header}>Login to TravelBuddy</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={'gray'}
          onChangeText={value => emailRef.current = value}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={'gray'}
          onChangeText={value => passwordRef.current = value}
          secureTextEntry
        />
        {/* <TouchableOpacity onPress={handleLogin} style={[styles.button, loading && styles.buttonDisabled]} disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity> */}

        <Pressable onPress={handleLogin} style={[styles.button, loading && styles.buttonDisabled]} disabled={loading} >
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
        </Pressable>

        <View style={styles.link}>
          <Text style={styles.text}>Don't have an account?</Text>
          <Pressable onPress={() => router.push('signup')}>
            <Text style={styles.linkText}>Sign Up</Text>
          </Pressable>
        </View>

      </View>

    </CustomKeyboardView>

  );
}

const styles = StyleSheet.create({
  appNameHeader: {
    backgroundColor: '#6DD195',
    borderRadius: 50,
    // left: -35,
    // top: -35,
    width: 100,
    height: 100,
    transform: [
      { scaleY: 2 }
    ],
    overflow: 'hidden'
  },
  container: {
    // backgroundColor: '#6DD195',
    // height: '100%',
    flex: 1,
    justifyContent: 'center',
    // padding: 16,
    paddingTop: StatusBar.currentHeight
  },
  inner: {
    padding: 16,
  },
  header: {
    textAlign: 'center',
    color: '#6DD195',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#1C6709', // Green color
    borderRadius: 10, // Rounded corners
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Android shadow
    color: 'white',
  },
  buttonText: {
    color: '#FFFFFF', // Text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#A3B7A0', // Lighter green for disabled state
  },
  link: {
    marginTop: 16,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
  },
  linkText: {
    color: '#1E90FF',
    fontSize: 16,
    padding: 8,
  },
});
