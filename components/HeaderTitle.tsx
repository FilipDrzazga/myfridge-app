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
        <AppText fontType="PoppinsBold" fontSize={40}>
          .
        </AppText>
        {name}
      </AppText>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({});
