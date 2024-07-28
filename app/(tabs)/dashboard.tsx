import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Image, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import Svg, { Path, Circle } from 'react-native-svg';
import { BarChart } from 'react-native-chart-kit';

export default function App() {
  const [mapVisible, setMapVisible] = useState(false);
  const [steps, setSteps] = useState(0);
  const [carbonFootprint, setCarbonFootprint] = useState(0);
  const [points, setPoints] = useState(100); // Example points value
  const [dropdownVisible, setDropdownVisible] = useState(false); // For dropdown menu
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity value for the animation

  useEffect(() => {
    // Mock data
    setSteps(5000); // Replace with actual step count logic
    setCarbonFootprint(2.5); // Replace with actual carbon footprint calculation

    // Fade in the welcome message when the app opens
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleMapVisibility = () => {
    setMapVisible(prevState => {
      const newState = !prevState;
      // Set the opacity to 0 immediately when hiding
      Animated.timing(fadeAnim, {
        toValue: newState ? 0 : 1,
        duration: newState ? 0 : 1000, // No delay for hide, fade-in on show
        useNativeDriver: true,
      }).start();
      return newState;
    });
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Yesterday", "Today"], // x axis data
    datasets: [
      {
        data: [20, 45, 28, 80, 99] // y axis data
      }
    ]
  };

  return (
    <View style={styles.container}>
      {/* Background Color Areas */}
      <View style={styles.backgroundUpper} />
      <View style={styles.backgroundLower} />

      {/* SVG for brown area between lines */}
      <Svg height="100%" width="100%" style={styles.backgroundBrown}>
        <Path
          d="M0,300 C150,150 300,450 450,300 Q600,150 750,300 Q900,450 1050,300"
          fill="#BE6B0F"
          stroke="none"
        />
      </Svg>

      {/* Background with two curves */}
      <Svg height="100%" width="100%" style={styles.backgroundCurve}>
        <Path
          d="M0,250 C150,100 300,400 450,250 Q600,100 750,250 Q900,400 1050,250"
          fill="none"
          stroke="#8B4513"
          strokeWidth="5"
        />
      </Svg>
      <Svg height="100%" width="100%" style={styles.backgroundCurve}>
        <Path
          d="M0,300 C150,150 300,450 450,300 Q600,150 750,300 Q900,450 1050,300"
          fill="none"
          stroke="#8B4513"
          strokeWidth="5"
        />
      </Svg>
      <Svg height="100%" width="100%" style={styles.quarterCircle}>
        <Circle
          cx="100%"
          cy="0%"
          r="150"
          fill="#FFFF00"
          stroke="#FFA500"
          strokeWidth="5"
        />
      </Svg>

      <View style={styles.topContainer}>
        <LinearGradient
          colors={['#6DD195', '#15E066']}
          style={styles.pointsButton}
        >
          <Text style={styles.pointsText}>{points}</Text>
        </LinearGradient>
        <TouchableOpacity style={styles.profileContainer} onPress={toggleDropdown}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/7.jpg' }} // Placeholder image URL https://via.placeholder.com/150
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.welcomeContainer, { opacity: fadeAnim }]}>
        <Text style={styles.welcomeText}>Welcome, Julianna Cardenas!</Text>
      </Animated.View>
      {dropdownVisible && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => console.log('View Profile')}>
              <Text style={styles.dropdownText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => console.log('Log Out')}>
              <Text style={styles.dropdownText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        )}
      <View style={styles.circleContainer}>
        <LinearGradient
          colors={['#6DD195', '#15E066']} // Updated gradient colors
          style={styles.circle}
        >
          <Text style={styles.circleText}>Steps: {steps}</Text>
          <Text style={styles.circleText}>Carbon: {carbonFootprint} kg</Text>
        </LinearGradient>
      </View>
      <TouchableOpacity style={styles.buttonWrapper} onPress={toggleMapVisibility}>
        <LinearGradient
          colors={['#6DD195', '#15E066']} // Updated gradient colors
          style={styles.buttonBackground}
        >
          <Text style={styles.buttonText}>{mapVisible ? 'Hide Map' : 'Show Map'}</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* BarChart Component */}
      <BarChart
        data={data}
        width={Dimensions.get('window').width - 40} // Adjusting for padding
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#6DD195",
          backgroundGradientFromOpacity: 1,
          backgroundGradientTo: "#15E066",
          backgroundGradientToOpacity: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
          useShadowColorFromDataset: false // optional
        }}
        yAxisLabel="" // Example: empty label
        yAxisSuffix="" // Example suffix for steps
        style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingVertical: 10
        }}
      />

      {mapVisible && (
        <View style={styles.mapContainer}>
          <MapView style={styles.map} showsUserLocation showsMyLocationButton />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  backgroundUpper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '50%',
    backgroundColor: '#71FFAA',
  },
  backgroundLower: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '100%',
    height: '60%',
    backgroundColor: '#71DDFF',
  },
  backgroundBrown: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  backgroundCurve: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 20, // Adjust this to move the profile picture and points up
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  pointsButton: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  pointsText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  quarterCircle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '50%',
    height: '50%',
  },
  welcomeContainer: {
    position: 'absolute',
    top: 70, // Move the welcome text up
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#6DD195',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    
  },
  dropdownItem: {
    paddingVertical: 10,

  
  },
  dropdownText: {
    fontSize: 16,
    color: 'white',
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70, // Adjust to move the circle up
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
  },
  circleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonWrapper: {
    marginTop: 40, // Adjust to move the button up
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonBackground: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapContainer: {
    position: 'absolute',
    top: 3, // Move the map up
    left: 0,
    right: 0,
    height: '50%', // Reduced height
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
