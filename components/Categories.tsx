import { StyleSheet, View } from "react-native";
import React from "react";

import Product from "./Product";

const Categories = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Product />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 10 },
});
