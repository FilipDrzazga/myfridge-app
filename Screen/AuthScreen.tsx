import React from "react";
import { Pressable, StyleSheet, View, Dimensions, type ViewToken } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
  type SharedValue,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import OnBoardingShorts from "../components/OnBoardingShorts";
import GlobalStyle from "../style/GlobalStyle";
import CustomText from "../components/CustomText";
import ONBOARDING_SHORTS from "../constants/ONBOARDING_SHORTS";
import ICONS_BACKGROUND from "../constants/ICONS_BACKGROUND";
import { RootStackParams } from "../navigation/AuthStackNavigation";

const WIDTH = Dimensions.get("screen").width;

interface IndicatorProps {
  scrollX: SharedValue<number>;
}

type AuthScreenProps = NativeStackScreenProps<RootStackParams, "SignIn", "SignUp">;

const Indicator = ({ scrollX }: IndicatorProps) => {
  return (
    <View style={styles.indicatorContainer}>
      {ONBOARDING_SHORTS.map((item, i) => {
        const animatedDots = useAnimatedStyle(() => {
          const scale = interpolate(scrollX.value, [(i - 1) * WIDTH, i * WIDTH, (i + 1) * WIDTH], [0.6, 0.9, 0.6], {
            extrapolateLeft: Extrapolation.CLAMP,
            extrapolateRight: Extrapolation.CLAMP,
          });
          const opacity = interpolate(scrollX.value, [(i - 1) * WIDTH, i * WIDTH, (i + 1) * WIDTH], [0.6, 1, 0.6], {
            extrapolateLeft: Extrapolation.CLAMP,
            extrapolateRight: Extrapolation.CLAMP,
          });
          return {
            opacity: opacity,
            transform: [{ scale: scale }],
          };
        });
        return <Animated.View key={`indicator-${i}`} style={[styles.indicators, animatedDots]}></Animated.View>;
      })}
    </View>
  );
};
``;
const AuthScreen = ({ navigation }: AuthScreenProps) => {
  const scrollX = useSharedValue(0);
  const isViewableItem = useSharedValue<ViewToken[]>([]);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundIcons}>
        {ICONS_BACKGROUND.map((icon, id) => (
          <Ionicons key={`icons-${id}`} name={icon.name} size={icon.size} color={icon.color} />
        ))}
      </View>
      <View style={styles.logoTxt}>
        <CustomText fontType="PoppinsBold" fontSize={60} color={GlobalStyle.colors.black}>
          fridge
        </CustomText>
      </View>
      <View style={styles.modal}>
        <View style={styles.onBoardingContainer}>
          <Animated.FlatList
            data={ONBOARDING_SHORTS}
            keyExtractor={(item) => item.short}
            renderItem={(item) => <OnBoardingShorts item={item} scrollX={scrollX} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={32}
            pagingEnabled
            onScroll={(e) => {
              scrollX.value = withTiming(e.nativeEvent.contentOffset.x);
            }}
          />
          <Indicator scrollX={scrollX} />
        </View>
        <View style={styles.btnContainer}>
          <Pressable onPress={() => navigation.navigate("SignUp")} style={styles.signUpBtn}>
            <CustomText
              additionalStyle={{ letterSpacing: 3 }}
              fontType="PoppinsRegular"
              fontSize={18}
              color={GlobalStyle.colors.black}
            >
              SIGN UP
            </CustomText>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("SignIn")} style={styles.loginBtn}>
            <CustomText
              additionalStyle={{ letterSpacing: 3 }}
              fontType="PoppinsRegular"
              fontSize={18}
              color={GlobalStyle.colors.screen.background}
            >
              LOGIN
            </CustomText>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  indicatorContainer: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 20,
  },
  indicators: { height: 20, width: 20, borderRadius: 25, backgroundColor: GlobalStyle.colors.screen.background },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: GlobalStyle.colors.screen.background,
  },
  backgroundIcons: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 60,
    width: "100%",
    height: "50%",
    marginTop: 40,
    opacity: 0.1,
  },
  logoTxt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "center",
    width: WIDTH,
    height: 500,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: GlobalStyle.colors.black,
  },
  onBoardingContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingTop: 60,
  },
  btnContainer: {
    flex: 2,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 70,
    borderRadius: 15,
    backgroundColor: GlobalStyle.colors.yellow,
  },
  loginBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 70,
    borderRadius: 15,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: GlobalStyle.colors.screen.background,
  },
});
