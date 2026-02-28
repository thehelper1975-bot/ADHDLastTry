import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { useOnboarding } from '../contexts/OnboardingContext';
import { COLORS, GRADIENTS } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, Check } from 'lucide-react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: 1,
    title: "Finally. A Habit Tracker for ADHD Brains.",
    subtitle: "Built to work with your brain, not against it.",
    options: []
  },
  {
    id: 2,
    title: "What is your biggest struggle?",
    subtitle: "We'll customize your experience.",
    options: ["Consistency", "Starting Tasks", "Forgetting", "Overwhelm"]
  },
  {
    id: 3,
    title: "What motivates you?",
    subtitle: "Choose your dopamine source.",
    options: ["Surprise Rewards", "Visual Streaks", "Gentle Reminders", "Collecting Points"]
  },
  {
    id: 4,
    title: "Ready to Hyperfocus?",
    subtitle: "Let's start your journey to better habits.",
    options: []
  }
];

export default function OnboardingScreen() {
  const { setOnboardingComplete } = useOnboarding();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});

  const nextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = async () => {
    await setOnboardingComplete();
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [currentSlideIndex]: option
    }));
  };

  const currentSlide = SLIDES[currentSlideIndex];

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Animated.View
            key={currentSlide.id}
            entering={FadeInRight}
            exiting={FadeOutLeft}
            style={styles.slide}
          >
            <Text style={styles.title}>{currentSlide.title}</Text>
            <Text style={styles.subtitle}>{currentSlide.subtitle}</Text>

            {currentSlide.options.length > 0 && (
              <View style={styles.optionsContainer}>
                {currentSlide.options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      selectedOptions[currentSlideIndex] === option && styles.optionButtonSelected
                    ]}
                    onPress={() => handleOptionSelect(option)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedOptions[currentSlideIndex] === option && styles.optionTextSelected
                    ]}>{option}</Text>
                    {selectedOptions[currentSlideIndex] === option && <Check size={20} color={COLORS.text} />}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </Animated.View>
        </View>

        <View style={styles.footer}>
          <View style={styles.pagination}>
            {SLIDES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentSlideIndex && styles.dotActive
                ]}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={nextSlide}
            accessibilityRole="button"
            accessibilityLabel={currentSlideIndex === SLIDES.length - 1 ? "Get Started" : "Continue"}
          >
            <Text style={styles.buttonText}>
              {currentSlideIndex === SLIDES.length - 1 ? "Get Started" : "Continue"}
            </Text>
            <ChevronRight color="#FFF" size={24} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  slide: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 40,
    lineHeight: 28,
  },
  optionsContainer: {
    width: '100%',
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionButtonSelected: {
    borderColor: COLORS.secondary,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
  optionText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: COLORS.text,
  },
  footer: {
    padding: 24,
    gap: 24,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.surface,
  },
  dotActive: {
    backgroundColor: COLORS.secondary,
    width: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
