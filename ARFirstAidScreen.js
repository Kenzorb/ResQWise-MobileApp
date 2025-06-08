import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  Modal,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function ARFirstAidScreen() {
  const navigation = useNavigation();
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [showCPRModal, setShowCPRModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [voiceInstructions, setVoiceInstructions] = useState(true);

  const totalSteps = 3;

  const procedures = [
    {
      id: 'cpr',
      title: 'CPR',
      description: 'Learn proper chest compression technique and rescue breathing',
      image: 'https://api.a0.dev/assets/image?text=CPR+chest+compression+technique&aspect=1:1&seed=901',
    },
    {
      id: 'choking',
      title: 'Choking',
      description: 'Learn the Heimlich maneuver and other techniques',
      image: 'https://api.a0.dev/assets/image?text=Heimlich+maneuver+technique&aspect=1:1&seed=902',
    },
    {
      id: 'burns',
      title: 'Burns',
      description: 'Learn how to treat different degrees of burns safely',
      image: 'https://api.a0.dev/assets/image?text=Burn+treatment+first+aid&aspect=1:1&seed=903',
    }
  ];

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const toggleVoiceInstructions = () => {
    setVoiceInstructions(!voiceInstructions);
  };

  const renderCPRStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Step 1: Check responsiveness</Text>
            <Text style={styles.stepSubtitle}>Step 1: Check responsiveness</Text>
            <Image 
              source={{ uri: 'https://api.a0.dev/assets/image?text=Check+responsiveness+CPR+tap+shoulder&aspect=16:9&seed=9046' }} 
              style={styles.stepImage}
            />
            <Text style={styles.stepDescription}>
              Tap the person's shoulder and ask loudly, "Are you OK?" to check for responsiveness.
            </Text>
            <View style={styles.navigationButtons}>
              <TouchableOpacity style={styles.navButton} onPress={handlePreviousStep}>
                <Ionicons name="chevron-back" size={20} color="#3498db" />
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navButton, styles.nextButton]} onPress={handleNextStep}>
                <Text style={styles.navButtonText}>Next</Text>
                <Ionicons name="chevron-forward" size={20} color="#3498db" />
              </TouchableOpacity>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Step 2: Call for help</Text>
            <Text style={styles.stepDescription}>
              If the person is unresponsive, call emergency services or ask someone else to call.
            </Text>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Step 3: Check breathing</Text>
            <Text style={styles.stepDescription}>
              Look, listen, and feel for breathing for no more than 10 seconds.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  const CPRGuideModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={showCPRModal}
        onRequestClose={() => setShowCPRModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <StatusBar barStyle="light-content" />
          
          {/* CPR Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTitle}>CPR</Text>
            <TouchableOpacity onPress={() => setShowCPRModal(false)} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
          
          {/* Progress Bar and Voice Instructions */}
          <View style={styles.instructionsContainer}>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${(currentStep / totalSteps) * 100}%` }]} />
            </View>
            <TouchableOpacity onPress={toggleVoiceInstructions} style={styles.voiceInstructionsContainer}>
              <Ionicons name={voiceInstructions ? "volume-high" : "volume-mute"} size={20} color="#3498db" />
              <Text style={styles.voiceInstructionsText}>
                Voice Instructions: {voiceInstructions ? 'ON' : 'OFF'}
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* CPR Steps */}
          <ScrollView style={styles.modalContent}>
            {renderCPRStep()}
            
            {/* Other steps visible but not expanded */}
            {currentStep !== 1 && (
              <View style={[styles.collapsedStep, currentStep === 2 ? styles.activeStep : null]}>
                <Text style={styles.stepTitle}>Step 2: Call for help</Text>
                {currentStep === 2 && (
                  <>
                    <Image 
                      source={{ uri: 'https://api.a0.dev/assets/image?text=Call+emergency+services+911&aspect=16:9&seed=9047' }} 
                      style={styles.stepImage}
                    />
                    <Text style={styles.stepDescription}>
                      If the person is unresponsive, call emergency services or ask someone else to call.
                    </Text>
                    <View style={styles.navigationButtons}>
                      <TouchableOpacity style={styles.navButton} onPress={handlePreviousStep}>
                        <Ionicons name="chevron-back" size={20} color="#3498db" />
                        <Text style={styles.navButtonText}>Previous</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.navButton, styles.nextButton]} onPress={handleNextStep}>
                        <Text style={styles.navButtonText}>Next</Text>
                        <Ionicons name="chevron-forward" size={20} color="#3498db" />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            )}
            
            {currentStep !== 1 && currentStep !== 2 && (
              <View style={[styles.collapsedStep, currentStep === 3 ? styles.activeStep : null]}>
                <Text style={styles.stepTitle}>Step 3: Check breathing</Text>
                {currentStep === 3 && (
                  <>
                    <Image 
                      source={{ uri: 'https://api.a0.dev/assets/image?text=Check+breathing+CPR+procedure&aspect=16:9&seed=9048' }} 
                      style={styles.stepImage}
                    />
                    <Text style={styles.stepDescription}>
                      Look, listen, and feel for breathing for no more than 10 seconds.
                    </Text>
                    <View style={styles.navigationButtons}>
                      <TouchableOpacity style={styles.navButton} onPress={handlePreviousStep}>
                        <Ionicons name="chevron-back" size={20} color="#3498db" />
                        <Text style={styles.navButtonText}>Previous</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Logo and Settings */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image 
              source={{ uri: 'https://api.a0.dev/assets/image?text=ResqWise+Logo+ECG+Heart+Line&aspect=1:1&seed=123' }} 
              style={styles.logo}
            />
            <Text style={styles.logoText}>RESQWISE</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* AR Guide Title and Description */}
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>AR First Aid Guide</Text>
          <Text style={styles.pageDescription}>
            Point Your Camera at the environment to receive guidance
          </Text>
        </View>

        {/* AR Camera Button */}
        <View style={styles.cameraContainer}>
          <Image 
            source={{ uri: 'https://api.a0.dev/assets/image?text=First+Aid+Kit+Red+Cross+Medical+Supplies&aspect=16:9&seed=904' }} 
            style={styles.cameraPreview}
          />
          <TouchableOpacity 
            style={styles.startGuideButton}
            onPress={() => navigation.navigate('ARCamera')}
          >
            <Text style={styles.startGuideButtonText}>Start Guide</Text>
          </TouchableOpacity>
        </View>

        {/* Procedures Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Select a Procedure</Text>

          {procedures.map((procedure) => (
            <TouchableOpacity 
              key={procedure.id}
              style={styles.procedureCard}
              onPress={() => {
                if (procedure.id === 'cpr') {
                  setShowCPRModal(true);
                  setCurrentStep(1);
                } else {
                  navigation.navigate('ProcedureDetail', { id: procedure.id });
                }
              }}
            >
              <View style={styles.procedureContent}>
                <View style={styles.procedureTextContent}>
                  <Text style={styles.procedureTitle}>{procedure.title}</Text>
                  <Text style={styles.procedureDescription}>
                    {procedure.description}
                  </Text>
                </View>
                <Image
                  source={{ uri: procedure.image }}
                  style={styles.procedureImage}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* CPR Guide Modal */}
      <CPRGuideModal />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Ionicons name="home" size={24} color="#777" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="first-aid" size={24} color="#4263eb" />
          <Text style={[styles.navText, styles.activeNav]}>First Aid</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('ARGuide')}
        >
          <MaterialCommunityIcons name="navigation-variant" size={24} color="#777" />
          <Text style={styles.navText}>AR Guide</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('AIWoundAnalyser')}
        >
          <MaterialCommunityIcons name="microscope" size={24} color="#777" />
          <Text style={styles.navText}>AI Analyser</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Training')}
        >
          <Ionicons name="school-outline" size={24} color="#777" />
          <Text style={styles.navText}>Training</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4263eb',
    marginLeft: 8,
  },
  titleContainer: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pageDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  cameraContainer: {
    position: 'relative',
    width: '100%',
    height: width * 0.5,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  cameraPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  startGuideButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#4263eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  startGuideButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  procedureCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  procedureContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  procedureTextContent: {
    flex: 1,
    paddingRight: 16,
  },
  procedureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  procedureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  procedureImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#777',
  },
  activeNav: {
    color: '#4263eb',
    fontWeight: '500',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  modalHeader: {
    backgroundColor: '#e74c3c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  modalHeaderTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  instructionsContainer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  voiceInstructionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voiceInstructionsText: {
    color: '#3498db',
    marginLeft: 8,
    fontSize: 16,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  stepContainer: {
    backgroundColor: '#f8f9fe',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 16,
  },
  stepImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  stepDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  collapsedStep: {
    backgroundColor: '#f0f2f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  activeStep: {
    backgroundColor: '#f8f9fe',
    padding: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  nextButton: {
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
  },
  navButtonText: {
    color: '#3498db',
    fontWeight: '500',
    marginHorizontal: 5,
  },
});