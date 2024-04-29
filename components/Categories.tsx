import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { AppContext } from "../context/AppContext";
import Product from "./Product";

const Categories = ({ navigation, route }) => {
  const ctx = useContext(AppContext);

  const filterProduct = () => {
    const productByCompartment = ctx.state.filter((item) => item.compartment === ctx.activeCompartmentTab);
    const productByCategory = productByCompartment.filter((item) => {
      return item.category === route.name || item.categoryAll === route.name ? item : null;
    });
    return productByCategory;
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 10 }}
        data={filterProduct()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Product id={item.id.toString()} name={item.name} quantity={item.quantity} bought={item.bought} />
        )}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 10 },
});
