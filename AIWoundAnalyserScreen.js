import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function AIWoundAnalyserScreen() {
  const navigation = useNavigation();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null)

  const startAnalysis = () => {
    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        woundType: 'Laceration',
        severity: 'Moderate',
        treatment: [
          'Clean the wound with clean water',
          'Apply gentle pressure to stop bleeding',
          'Apply antiseptic solution',
          'Cover with sterile bandage',
          'Seek medical attention if deeper than 1/4 inch'
        ]
      });
    }, 2000);
  };

  const resetAnalysis = () => {
    setResult(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://api.a0.dev/assets/image?text=RESQWISE&aspect=1:1' }}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>AI Wound Analyser</Text>
        <Ionicons name="settings-outline" size={24} color="#333" />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Wound Analysis</Text>
          <Text style={styles.subtitle}>
            Take a photo of a wound to get AI-powered first aid guidance
          </Text>

          {!result ? (
            <View style={styles.cameraContainer}>
              <Image 
                source={{ uri: 'https://api.a0.dev/assets/image?text=Camera+View&aspect=16:9' }}
                style={styles.cameraPreview}
              />
              <TouchableOpacity 
                style={[styles.button, analyzing && styles.analyzingButton]} 
                onPress={startAnalysis}
                disabled={analyzing}
              >
                <Text style={styles.buttonText}>
                  {analyzing ? 'Analyzing...' : 'Take Photo & Analyse'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.resultContainer}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultTitle}>Analysis Results</Text>
                <Text style={styles.resultSubtitle}>Wound Type: <Text style={styles.highlight}>{result.woundType}</Text></Text>
                <Text style={styles.resultSubtitle}>Severity: <Text style={[styles.highlight, styles.severityModerate]}>{result.severity}</Text></Text>
              </View>
              
              <View style={styles.treatmentContainer}>
                <Text style={styles.treatmentTitle}>Recommended First Aid:</Text>
                {result.treatment.map((step, index) => (
                  <View key={index} style={styles.treatmentStep}>
                    <Text style={styles.stepNumber}>{index + 1}</Text>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>
              
              <TouchableOpacity style={styles.resetButton} onPress={resetAnalysis}>
                <Text style={styles.resetButtonText}>Analyse Another Wound</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.disclaimer}>
          <FontAwesome5 name="exclamation-triangle" size={16} color="#e74c3c" />
          <Text style={styles.disclaimerText}>
            This is an AI assistant only. For serious injuries, always seek professional medical help immediately.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Ionicons name="home" size={24} color="#888" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('FirstAid')}
        >
          <FontAwesome5 name="first-aid" size={22} color="#888" />
          <Text style={styles.navText}>First Aid</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('ARGuide')}
        >
          <MaterialCommunityIcons name="navigation-variant" size={24} color="#888" />
          <Text style={styles.navText}>AR Guide</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {}}
        >
          <MaterialCommunityIcons name="microscope" size={24} color="#4263eb" />
          <Text style={[styles.navText, styles.activeNavText]}>AI Analyser</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Training')}
        >
          <Ionicons name="school" size={24} color="#888" />
          <Text style={styles.navText}>Training</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4263eb',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  cameraContainer: {
    alignItems: 'center',
  },
  cameraPreview: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4263eb',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  analyzingButton: {
    backgroundColor: '#8c9fef',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    padding: 8,
  },
  resultHeader: {
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  resultSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  highlight: {
    color: '#4263eb',
    fontWeight: '600',
  },
  severityModerate: {
    color: '#f39c12',
  },
  treatmentContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  treatmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  treatmentStep: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  stepNumber: {
    backgroundColor: '#4263eb',
    color: '#fff',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  resetButton: {
    backgroundColor: '#e0e7ff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#4263eb',
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  disclaimerText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#856404',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: 12,
    paddingTop: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavItem: {
    borderTopWidth: 3,
    borderTopColor: '#4263eb',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
  },
  activeNavText: {
    color: '#4263eb',
  }
});