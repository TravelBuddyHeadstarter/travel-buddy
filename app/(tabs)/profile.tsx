import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> library
          to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

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

//   const saveProfile = (values) => {
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
//     .catch(error => {
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
//           onSubmit={values => saveProfile(values)}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
