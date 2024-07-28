// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Leaderboard from '@/components/Leaderboard'; // Ensure the path is correct

// const Tab = createBottomTabNavigator();

// const App: React.FC = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Friends" component={Leaderboard} />
//         <Tab.Screen name="All Time" component={Leaderboard} />
//         {/* You can use different components or pass different props for different lists */}
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Platform, Pressable } from 'react-native'; // SegmentedControlIOS
// import SegmentedControl from '@react-native-community/segmented-control';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

type Player ={
  place: number;
  profilePic: string;
  username: string;
  score: number;
}

const LeaderboardScreen: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const friends = [
    { id: '1', place: 1, profilePic: 'https://randomuser.me/api/portraits/men/1.jpg', username: 'shadowhunter', score: 20000 },
    { id: '2', place: 2, profilePic: 'https://randomuser.me/api/portraits/women/2.jpg', username: 'dragonslayer123', score: 15650 },
    { id: '3', place: 3, profilePic: 'https://randomuser.me/api/portraits/women/3.jpg', username: 'mystic.ninja', score: 12000 },
    { id: '4', place: 4, profilePic: 'https://randomuser.me/api/portraits/men/4.jpg', username: 'blaze_king88', score: 6000 },
    { id: '5', place: 5, profilePic: 'https://randomuser.me/api/portraits/men/5.jpg', username: 'roguewarrior_42', score: 500 },
    { id: '6', place: 6, profilePic: 'https://randomuser.me/api/portraits/men/6.jpg', username: 'frostbyte_x', score: 200 },
    { id: '7', place: 7, profilePic: 'https://randomuser.me/api/portraits/men/7.jpg', username: 'cyber.sonic', score: 200 },
  ];

  const all = [
    { id: '1', place: 1, profilePic: 'https://randomuser.me/api/portraits/men/7.jpg', username: 'julcarde420', score: 20000 },
    { id: '2', place: 2, profilePic: 'https://randomuser.me/api/portraits/men/8.jpg', username: 'fguero34', score: 15650 },
    { id: '3', place: 3, profilePic: 'https://randomuser.me/api/portraits/women/9.jpg', username: '4jared_cool', score: 12000 },
    { id: '4', place: 4, profilePic: 'https://randomuser.me/api/portraits/women/10.jpg', username: 'itsashleyy1', score: 6000 },
    { id: '5', place: 5, profilePic: 'https://randomuser.me/api/portraits/men/11.jpg', username: 'carolking32', score: 500 },
    { id: '6', place: 6, profilePic: 'https://randomuser.me/api/portraits/men/12.jpg', username: 'viperrunner12', score: 200 },
    { id: '7', place: 7, profilePic: 'https://randomuser.me/api/portraits/women/13.jpg', username: 'truejones53', score: 50 },
  ];

  const filteredData = selectedIndex === 0 ? friends : all; // Adjust filtering as needed

  const renderItem = ({ item }: { item: Player }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.place}>{item.place}</Text>
      <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
      <View style={styles.details}>
        <Text style={styles.username}>{item.username}</Text>
      </View>
        <Text style={styles.score}>{item.score} PTS</Text>
    </View>
  );

  return (
    <View style={Platform.OS === 'ios' ? [styles.container,{paddingTop:50}] : styles.container}>
      {Platform.OS === 'ios' ? (
        <SegmentedControl
          values={['Top Players', 'All Players']}
          selectedIndex={selectedIndex}
          onValueChange={(value) => setSelectedIndex(value === 'Top Players' ? 0 : 1)}
          tintColor='#34D399'
        />
      ) : (
        <View style={styles.segmentControl}>
          <Pressable onPress={() => setSelectedIndex(0)} style={selectedIndex === 0 ? styles.activeTab : styles.tab}>
            <Text style={selectedIndex === 0 ? styles.activeTabText : styles.tabText}>Top Players</Text>
          </Pressable>
          <Pressable onPress={() => setSelectedIndex(1)} style={selectedIndex === 1 ? styles.activeTab : styles.tab}>
            <Text style={selectedIndex === 1 ? styles.activeTabText : styles.tabText}>All Players</Text>
          </Pressable>
        </View>
      )}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  segmentControl: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#dfffde',
  },
  activeTab: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    // borderBottomWidth: 4,
    // borderBottomColor: '#34D399',
    // color: 'white',
    backgroundColor: '#34D399',
  },
  tabText: {
    fontSize: 20,
    color: '#333',
  },
  activeTabText: {
    fontSize: 20,
    color: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#34D399',
  },
  place: {
    fontSize: 20,
    fontWeight: 'bold',
    // width: 50,
    textAlign: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 16,
  },
  details: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 16,
    color: '#888',
  },
});

export default LeaderboardScreen;
