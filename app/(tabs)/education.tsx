import React, { useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const rewardsData = [
  { id: '1', name: 'Free Coffee', points: 150, featured: true },
  { id: '2', name: 'Free Smoothie', points: 150, featured: true },
  { id: '3', name: 'Free Ice Cream', points: 200, featured: false },
  { id: '4', name: 'Discounted Sandwich', points: 250, featured: false },
  { id: '5', name: '$5 Charity Donation', points: 300, featured: true },
  { id: '6', name: 'Xbox Gift Card', points: 500, featured: false },
  { id: '7', name: 'PlayStation Gift Card', points: 500, featured: false },
  { id: '8', name: 'Visa Gift Card', points: 500, featured: false },
  { id: '9', name: 'MasterCard Gift Card', points: 500, featured: false },
  { id: '10', name: 'Sephora Gift Card', points: 500, featured: false },
  { id: '11', name: 'Home Depot Gift Card', points: 500, featured: false },
  { id: '12', name: 'Google Play Gift Card', points: 500, featured: false },
  { id: '13', name: 'Amazon Gift Card', points: 500, featured: true },
  { id: '14', name: 'Steam Gift Card', points: 500, featured: false },
  { id: '15', name: 'Apple Gift Card', points: 500, featured: false },
  { id: '16', name: 'Free Meal', points: 600, featured: true },
  { id: '17', name: 'Discounted Patagonia', points: 800, featured: false },
  { id: '18', name: 'Discounted tentree', points: 800, featured: false },
  { id: '19', name: 'Free Travel Mug', points: 1000, featured: true },
  { id: '20', name: 'Free Solar Power Bank', points: 1500, featured: false },
  { id: '21', name: 'Free Home Gardening Kit', points: 2000, featured: false },
  { id: '22', name: 'Pack of Eco-Drinks', points: 2000, featured: false },
  { id: '23', name: 'Discounted Airfare', points: 5000, featured: false },
  // Add more rewards here
];

const pointRanges = [
  { label: 'All', min: 0, max: Infinity },
  { label: '150-300 points', min: 150, max: 300 },
  { label: '400-600 points', min: 400, max: 600 },
  { label: '600-1000 points', min: 600, max: 1000 },
  { label: '1000-2000 points', min: 1000, max: 2000 },
  { label: '2000-5000 points', min: 2000, max: 5000 },
  // Add more ranges here
];

const RewardsStore = () => {
  const [points, setPoints] = useState(350); // Example points
  const [selectedRange, setSelectedRange] = useState(pointRanges[0]);

  const filteredRewards = rewardsData.filter(reward => 
    reward.points >= selectedRange.min && reward.points <= selectedRange.max
  );

  const handleRewardPress = (reward) => {
    // Handle the reward item press event
    // For example, navigate to a detail screen or show a modal
    console.log(`Selected reward: ${reward.name}`);
  };

  const renderRewardItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.rewardItem}
      onPress={() => handleRewardPress(item)}
    >
      <Text style={styles.rewardName}>{item.name}</Text>
      <Text style={styles.rewardPoints}>{item.points} points</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pointsText}>Your Points: {points}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Items</Text>
        <FlatList
          horizontal
          data={rewardsData.filter(reward => reward.featured)}
          renderItem={renderRewardItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rewards</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.buttonContainer}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {pointRanges.map(range => (
            <TouchableOpacity 
              key={range.label} 
              style={[
                styles.rangeButton, 
                selectedRange.label === range.label && styles.selectedRangeButton
              ]}
              onPress={() => setSelectedRange(range)}
            >
              <Text style={styles.rangeButtonText}>{range.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <FlatList
          data={filteredRewards}
          renderItem={renderRewardItem}
          keyExtractor={item => item.id}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#34D399',
    padding: 20,
    alignItems: 'center',
    marginTop: 32

  },
  pointsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  rewardItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  rewardName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rewardPoints: {
    marginTop: 5,
    color: '#888',
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  rangeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#34D399',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  selectedRangeButton: {
    backgroundColor: '#22805e',
  },
  rangeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RewardsStore;
