import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Onboarding() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['#3b5bdb', '#4263eb']} 
        style={styles.background}
      >
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://api.a0.dev/assets/image?text=ResqWise+Logo+ECG+Heart+Line&aspect=1:1&seed=123' }} 
            style={styles.logo} 
          />
          <Text style={styles.logoText}>RESQWISE</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://api.a0.dev/assets/image?text=Emergency+assistance+illustration+with+person+helping+injured+person+and+blue+medical+cross&aspect=1:1&seed=456' }} 
            style={styles.heroImage} 
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.heading}>Your smart companion in any emergency.</Text>
          <Text style={styles.subheading}>
            Be prepared, stay safe, and report crises effectively to help your community.
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.buttonText}>Let's Start</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  imageContainer: {
    width: '100%',
    height: height * 0.35,
    marginVertical: 20,
    alignItems: 'center',
  },
  heroImage: {
    width: '80%',
    height: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  heading: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subheading: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.9,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '90%',
  },
  buttonText: {
    color: '#3b5bdb',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});