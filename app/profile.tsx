import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText } from '@/components/ThemedText';
import CustomKeyboardView from '@/components/CustomKeyboardView';
import { useAuth } from '@/context/authContext';

const ProfilePage: React.FC = () => {
  const profileImageRef = useRef<string | null>("https://randomuser.me/api/portraits/men/7.jpg");
  const nameRef = useRef("ajohnson");
  const emailRef = useRef("ajohnson@gmail.com");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const [loading, setLoading] = useState<boolean>(false);
  const [porfileImage, setProfileImage] = useState<string>("https://randomuser.me/api/portraits/men/7.jpg");
  const {editProfile} = useAuth();

  // Handle image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      profileImageRef.current = result.assets[0].uri;
      setProfileImage(result.assets[0].uri)
    }
  };

  // Handle form submission
  const handleSave = async() => {
    setLoading(true);
    const name = nameRef.current ?? '';
    const email = emailRef.current ?? '';
    const password = passwordRef.current ?? '';
    const confirmPassword = confirmPasswordRef.current ?? '';

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Handle form data submission (e.g., send to server)
    let response = await editProfile(nameRef.current, emailRef.current, passwordRef.current)
    setLoading(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  return (
    <View style={styles.container}>
      <CustomKeyboardView>
        <ThemedText type='title' style={styles.header}>Edit Profile</ThemedText>
        <Pressable onPress={pickImage}>
          <View style={styles.imageContainer}>
            <Image
              source={profileImageRef.current ? { uri: profileImageRef.current } : { uri: 'https://randomuser.me/api/portraits/men/7.jpg' }} // require('./assets/default-avatar.png')
              style={styles.profileImage}
            />
            <Text style={styles.changePhotoText}>Change Profile Photo</Text>
          </View>
        </Pressable>

        <View style={styles.formContainer}>
          <TextInput
            defaultValue={nameRef.current}
            style={styles.input}
            placeholder="Username"
            onChangeText={value => nameRef.current = value}
            placeholderTextColor={'gray'}
          />
          <TextInput
            defaultValue={emailRef.current}
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={value => emailRef.current = value}
            placeholderTextColor={'gray'}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={value => passwordRef.current = value}
            placeholderTextColor={'gray'}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={value => confirmPasswordRef.current = value}
            placeholderTextColor={'gray'}
            secureTextEntry
          />

          <Pressable onPress={handleSave} style={[styles.button, loading && styles.buttonDisabled]} disabled={loading} >
            <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save'}</Text>
          </Pressable>
        </View>
      </CustomKeyboardView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePhotoText: {
    marginTop: 8,
    color: '#007bff',
  },
  header: {
    textAlign: 'center',
    color: '#6DD195',
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonDisabled: {
    backgroundColor: '#A3B7A0', // Lighter green for disabled state
  },
  buttonText: {
    color: '#FFFFFF', // Text color
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default ProfilePage;



// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import { useNavigation, NavigationProp } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
// import { ProfileScreenNavigationProp } from './types'; // Adjust the import path based on your project structure

// const ProfileSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//     .required('Confirm Password is required'),
// });

// const ProfileScreen = () => {
//   const [image, setImage] = useState<string | null>(null);
//   const navigation = useNavigation<ProfileScreenNavigationProp>();

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled && result.assets) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const saveProfile = (values: { name: any; email: any; password: any; }) => {
//     const userRef = firestore().collection('users').doc('USER_ID'); // Replace 'USER_ID' with the actual user ID
//     userRef.set({
//       name: values.name,
//       email: values.email,
//       password: values.password,
//       profileImage: image,
//     })
//     .then(() => {
//       console.log('User updated!');
//       navigation.navigate('Dashboard');
//     })
//     .catch((error: any) => {
//       console.error("Error updating user: ", error);
//     });
//   };

//   return (
//     <ImageBackground source={require('./bg.png')} style={styles.backgroundImage}>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
//             <Text style={styles.backButton}>←</Text>
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Your Profile</Text>
//         </View>
//         <Formik
//           initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
//           validationSchema={ProfileSchema}
//           onSubmit={(values: { name: any; email: any; password: any; }) => saveProfile(values)}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values, errors, touched }:any) => (
//             <View style={styles.formContainer}>
//               <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
//                 {image ? (
//                   <Image source={{ uri: image }} style={styles.profileImage} />
//                 ) : (
//                   <View style={styles.imagePlaceholder}>
//                     <Text>Edit Photo</Text>
//                   </View>
//                 )}
//               </TouchableOpacity>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Name"
//                 onChangeText={handleChange('name')}
//                 onBlur={handleBlur('name')}
//                 value={values.name}
//               />
//               {errors.name && touched.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 keyboardType="email-address"
//                 onChangeText={handleChange('email')}
//                 onBlur={handleBlur('email')}
//                 value={values.email}
//               />
//               {errors.email && touched.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
//               <TextInput
//                 style={styles.input}
//                 placeholder="Change Password"
//                 secureTextEntry
//                 onChangeText={handleChange('password')}
//                 onBlur={handleBlur('password')}
//                 value={values.password}
//               />
//               {errors.password && touched.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
//               <TextInput
//                 style={styles.input}
//                 placeholder="Confirm Password"
//                 secureTextEntry
//                 onChangeText={handleChange('confirmPassword')}
//                 onBlur={handleBlur('confirmPassword')}
//                 value={values.confirmPassword}
//               />
//               {errors.confirmPassword && touched.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
//               <TouchableOpacity onPress={() => handleSubmit()} style={styles.saveButton}>
//                 <Text style={styles.saveButtonText}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </Formik>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: 'rgba(21, 224, 102, 0.5)', // Adjust the opacity for the overlay effect
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//   },
//   backButton: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     flex: 1,
//     marginRight: 24, // Adjust this value based on your design
//   },
//   formContainer: {
//     flex: 1,
//     backgroundColor: '#6DD195',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: 20,
//     alignItems: 'center',
//   },
//   imageContainer: {
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   imagePlaceholder: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#cccccc',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#cccccc',
//     padding: 10,
//     marginVertical: 10,
//     borderRadius: 5,
//   },
//   errorText: {
//     color: 'red',
//     alignSelf: 'flex-start',
//   },
//   saveButton: {
//     backgroundColor: '#004400',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//     width: '100%',
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default ProfileScreen;
