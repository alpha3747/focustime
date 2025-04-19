import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { fontSizes, paddingSizes } from "../../utils/sizes";
import { colors } from "../../utils/colors";

export const Focus = ({ onStartFocus }) => {
  const [subject, setSubject] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(null);

  const handleStart = () => {
    if (!subject.trim()) {
      ToastAndroid.show("Please enter a task", ToastAndroid.SHORT);
      return;
    }
    if (!selectedDuration) {
      ToastAndroid.show("Please select a duration", ToastAndroid.SHORT);
      return;
    }
    onStartFocus(subject.trim(), selectedDuration);
    setSubject("");
    setSelectedDuration(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>What would you like to focus on?</Text>

      <TextInput
        value={subject}
        onChangeText={setSubject}
        placeholder="Type your task"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
      />

      <Text style={styles.subheading}>Select duration</Text>
      <View style={styles.durationRow}>
        {[1, 5, 15, 30, 45, 60].map((min) => (
          <TouchableOpacity
            key={min}
            style={[
              styles.durationBtn,
              selectedDuration === min && { backgroundColor: colors.primary },
            ]}
            onPress={() => setSelectedDuration(min)}
          >
            <Text style={styles.durationText}>{min}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.startBtn} onPress={handleStart}>
        <Text style={styles.startText}>Start Focus</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: paddingSizes.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: colors.textPrimary,
    fontSize: fontSizes.xl,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: paddingSizes.md,
  },
  input: {
    width: "85%",
    height: 48,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    borderRadius: 8,
    paddingHorizontal: paddingSizes.md,
    marginBottom: paddingSizes.md,
  },
  subheading: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
    textAlign: "center",
    marginVertical: paddingSizes.md,
  },
  durationRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  durationBtn: {
    backgroundColor: colors.surface,
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  durationText: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: "bold",
  },
  startBtn: {
    marginTop: paddingSizes.xl,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignSelf: "center",
    elevation: 4,
  },
  startText: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: fontSizes.md,
  },
});
