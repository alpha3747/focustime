import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../src/utils/colors.js";
import { Focus } from "../src/features/focus/focus";
import { Timer } from "../src/features/timer/timer.js";

const App = () => {
  const [focusSubject, setFocusSubject] = useState(null);
  const [duration, setDuration] = useState(0);

  const startFocus = (subject, time) => {
    setFocusSubject(subject);
    setDuration(time);
  };

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          minutes={duration}
          onGoBack={() => {
            setFocusSubject(null);
            setDuration(0);
          }}
        />
      ) : (
        <Focus onStartFocus={startFocus} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkPurple,
  },
});

export default App;
