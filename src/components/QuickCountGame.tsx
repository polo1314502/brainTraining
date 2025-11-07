import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const QuickCountGame = () => {
  const [gameState, setGameState] = useState('start'); // 'start', 'showing', 'guessing', 'result'
  const [items, setItems] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [userGuess, setUserGuess] = useState(null);
  const [score, setScore] = useState(0);

  const generateItems = () => {
    const count = Math.floor(Math.random() * 10) + 5; // Random number between 5 and 14
    const newItems = Array.from({ length: count }, (_, index) => ({
      id: index,
      style: {
        position: 'absolute',
        left: Math.random() * 300,
        top: Math.random() * 400,
        width: 20,
        height: 20,
        backgroundColor: 'blue',
        borderRadius: 10,
      },
    }));
    setItems(newItems);
    setCorrectCount(count);
  };

  const startGame = () => {
    generateItems();
    setGameState('showing');
    setUserGuess(null);
  };

  useEffect(() => {
    let timer;
    if (gameState === 'showing') {
      timer = setTimeout(() => {
        setGameState('guessing');
      }, Math.max(2000 - (score * 100), 500)); // Decrease time as score increases, but not below 500ms
    }
    return () => clearTimeout(timer);
  }, [gameState]);

  const handleGuess = (guess) => {
    setUserGuess(guess);
    setGameState('result');
    if (guess === correctCount) {
      setScore((prev) => prev + 1);
      Alert.alert('Correct!', `The count was ${correctCount}. Your score: ${score + 1}`);
    } else {
      Alert.alert('Wrong!', `The correct count was ${correctCount}. Your score: ${score}`);
    }
  };

  const resetGame = () => {
    setGameState('start');
    setItems([]);
    setCorrectCount(0);
    setUserGuess(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Count Game</Text>
      <Text style={styles.score}>Score: {score}</Text>

      {gameState === 'start' && (
        <Button title="Start Game" onPress={startGame} />
      )}

      {gameState === 'showing' && (
        <View style={styles.gameArea}>
          {items.map((item) => (
            <View key={item.id} style={item.style} />
          ))}
        </View>
      )}

      {gameState === 'guessing' && (
        <View style={styles.guessContainer}>
          <Text>How many blue circles did you see?</Text>
          {[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num) => (
            <Button key={num} title={`${num}`} onPress={() => handleGuess(num)} />
          ))}
        </View>
      )}

      {gameState === 'result' && (
        <View>
          <Button title="Play Again" onPress={startGame} />
          <Button title="Reset Score" onPress={() => { resetGame(); setScore(0); }} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  score: {
    fontSize: 18,
    marginBottom: 20,
  },
  gameArea: {
    width: 320,
    height: 420,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    position: 'relative',
  },
  guessContainer: {
    alignItems: 'center',
  },
});

export default QuickCountGame;