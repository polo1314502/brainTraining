import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  TextInput,
} from "react-native";

export default function MemorizeSequenceGame() {
  const [step, setStep] = useState(0);
  const [sequence, setSequence] = useState([]); // Computer's sequence
  const [userSequence, setUserSequence] = useState([]); // User's input
  const [isShowing, setIsShowing] = useState(false); // Showing sequence or not
  const [activeButton, setActiveButton] = useState(null); // For flashing effect

  const colors = ["red", "green", "blue", "yellow", "grey", "purple"]; // Button colors

  const startNewGame = () => {
    const newSequence = generateSequence(step); // Start with 3 steps
    setSequence(newSequence);
    setUserSequence([]);
    showSequence(newSequence);
  };

  const generateSequence = (length) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 4)); // 0-3 for 4 buttons
  };

  const showSequence = async (seq) => {
    setIsShowing(true);
    for (let i = 0; i < seq.length; i++) {
      setActiveButton(seq[i]);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Flash for 0.5s
      setActiveButton(null);
      await new Promise((resolve) => setTimeout(resolve, 200)); // Pause 0.2s
    }
    setIsShowing(false);
  };

  const handlePress = (index) => {
    if (isShowing) return; // Ignore taps during sequence display
    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    // Check if user sequence matches so far
    if (newUserSequence.length === sequence.length) {
      checkResult(newUserSequence);
    }
  };

  const checkResult = (userSeq) => {
    const isCorrect = userSeq.every((val, idx) => val === sequence[idx]);
    Alert.alert(
      isCorrect ? "Success!" : "Wrong!",
      isCorrect ? "You got it!" : "Try again.",
      [{ text: "OK", onPress: () => {} }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memorize the Sequence</Text>
      <TextInput
        style={{
          height: 40,
          width: 100,
          borderColor: "gray",
          borderWidth: 1,
          textAlign: "center",
        }}
        onChangeText={(step) =>
          setStep(Number.isNaN(parseInt(step)) ? 0 : parseInt(step))
        }
        value={`${step}`}
        keyboardType="numeric"
      ></TextInput>
      <TouchableOpacity
        onPress={startNewGame}
        style={{
          margin: 20,
          padding: 10,
          backgroundColor: "#ccc",
          borderRadius: 5,
        }}
      >
        <Text>Start</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              { backgroundColor: color },
              activeButton === index && styles.activeButton,
            ]}
            onPress={() => handlePress(index)}
            disabled={isShowing}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
    opacity: 0.7,
  },
  activeButton: {
    opacity: 1,
    borderWidth: 2,
    borderColor: "#000",
  },
});
