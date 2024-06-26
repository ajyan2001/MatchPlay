import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import React, { Fragment, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Choice from "./Choice";
import { useSelector } from "react-redux";
import { userProfileSelector } from "../slices/userProfile";

const { width, height } = Dimensions.get("screen");

const Card = ({
  name,
  selfDescription,
  image,
  isFirst,
  swipe,
  titleSign,
  ...rest
}) => {
  const {
    userProfile,
    loading: profileLoading,
    hasErrors: profileHasErrors,
  } = useSelector(userProfileSelector);

  const rotate = Animated.multiply(swipe.x, titleSign).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ["8deg", "0deg", "-8deg"],
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const dislikeOpacity = swipe.x.interpolate({
    inputRange: [-100, -25],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const renderChoice = useCallback(() => {
    return (
      <Fragment>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.likeContainer,
            { opacity: likeOpacity },
          ]}
        >
          <Choice type="like" />
        </Animated.View>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.dislikeContainer,
            { opacity: dislikeOpacity },
          ]}
        >
          <Choice type="dislike" />
        </Animated.View>
      </Fragment>
    );
  }, [likeOpacity, dislikeOpacity]);
  return (
    <Animated.View
      style={[styles.container, isFirst && animatedCardStyle]}
      {...rest}
    >
      <View style={styles.data}>
        {image ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${image}` }}
            style={styles.image}
          />
        ) : (
          <Image
            source={require("../assets/golfer_.png")}
            style={styles.image}
          />
        )}

        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]}
          style={styles.gradient}
        >
          <View style={styles.userContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.content}>
              {selfDescription.length < 110
                ? selfDescription
                : selfDescription.slice(0, 110) + "..."}
            </Text>
          </View>
        </LinearGradient>
      </View>
      {isFirst && renderChoice()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  content: {
    fontSize: 15,
    color: "white",
    fontWeight: "400",
    width: 200,
  },
  data: {
    display: "flex",
    justifyContent: "flex-end",
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  container: {
    position: "absolute",
    top: 0,
  },
  image: {
    width: width * 0.9,
    height: height * 0.72,
    resizeMode: "contain",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  userContainer: {
    position: "absolute",
    bottom: 24,
    left: 24,
    paddingBottom: 120,
  },
  name: {
    fontSize: 30,
    color: "white",
    fontWeight: "400",
  },
  choiceContainer: {
    position: "absolute",
    top: 100,
  },
  likeContainer: {
    left: 45,
    transform: [{ rotate: "-30 deg" }],
  },
  dislikeContainer: {
    right: 45,
    transform: [{ rotate: "30 deg" }],
  },
});

export default Card;
