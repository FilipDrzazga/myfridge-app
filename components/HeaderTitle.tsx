import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "./AppText";

interface Props {
  name: string;
}

const HeaderTitle = ({ name }: Props) => {
  return (
    <View>
      <AppText fontType="PoppinsRegular" fontSize={40}>
        <AppText fontType="PoppinsBlack" color="#25f18b" fontSize={40}>
          .
        </AppText>
        {name}
      </AppText>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({});
