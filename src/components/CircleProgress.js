import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircleProgress = ({
  progress,
  radius = 100,
  strokeWidth = 10,
}) => {
  const size = radius * 2;
  const circumference = 2 * Math.PI * radius;
  const animatedValue = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={radius}
        cy={radius}
        r={radius}
        stroke="#333"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <AnimatedCircle
        cx={radius}
        cy={radius}
        r={radius}
        stroke="#BB86FC"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
};
