import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const TabThree = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentAndBottomNavBarContainer}>
        <View style={styles.contentContainer}>
          <View>
            <Text>Tab Three</Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
          ></ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentAndBottomNavBarContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TabThree;
