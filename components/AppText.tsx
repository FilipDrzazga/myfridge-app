import { View, Text } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

interface Props {
  type: string;
  children: React.ReactNode;
}

const AppText = ({ type, children }: Props) => {
  const [fontsLoaded, fontError] = useFonts({
    DMSansLight: require("../assets/font/DMSans-Light.ttf"),
    DMSansRegular: require("../assets/font/DMSans-Regular.ttf"),
    DMSansMeduim: require("../assets/font/DMSans-Medium.ttf"),
    DMSansBold: require("../assets/font/DMSans-Bold.ttf"),
  });

  return (
    <View>
      <Text style={{ fontFamily: type }}>{children}</Text>
    </View>
  );
};

export default AppText;
