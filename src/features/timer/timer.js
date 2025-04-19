import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { colors } from "../../utils/colors";
import { fontSizes, paddingSizes } from "../../utils/sizes";
// import * as Notifications from "expo-notifications";
import { CircleProgress } from "../../components/CircleProgress";

export const Timer = ({ focusSubject, minutes, onGoBack }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  // const [isPaused, setIsPaused] = useState(null);
  const intervalRef = useRef(null);

  const totalTime = minutes * 60;

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          Vibration.vibrate(500);
          // sendNotification();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePause = () => clearInterval(intervalRef.current);

  const handleResume = () => startTimer();
  const handleRestart = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(minutes * 60);
    startTimer();
  };
  const handleStop = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(0);
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // const sendNotification = async () => {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "Focus session complete!",
  //       body: `You just finished your "${focusSubject}" session.`,
  //       sound: true,
  //     },
  //     trigger: null,
  //   });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.circleWrapper}>
        <CircleProgress
          progress={timeLeft / totalTime}
          radius={110}
          strokeWidth={1}
        />
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      </View>

      <Text style={styles.focusLabel}>Focus on</Text>
      <Text style={styles.focusSubject}>{focusSubject}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={handlePause} style={styles.button}>
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleResume} style={styles.button}>
          <Text style={styles.buttonText}>Resume</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRestart} style={styles.button}>
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStop} style={styles.button}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onGoBack} style={styles.goBackBtn}>
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: paddingSizes.lg,
  },
  circleWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    margin: paddingSizes.xl,
    marginBottom: 30,
  },
  timerText: {
    position: "absolute",
    fontSize: fontSizes.xxl,
    color: colors.textPrimary,
    fontWeight: "bold",
  },
  focusLabel: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    marginTop: 8,
  },
  focusSubject: {
    fontSize: fontSizes.lg,
    color: colors.textPrimary,
    fontWeight: "600",
    marginBottom: paddingSizes.lg,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: paddingSizes.lg,
  },
  button: {
    backgroundColor: colors.surface,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: fontSizes.sm,
    fontWeight: "500",
  },
  goBackBtn: {
    marginTop: paddingSizes.sm,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  goBackText: {
    color: colors.black,
    fontSize: fontSizes.md,
    fontWeight: "bold",
  },
});

export default Timer;
