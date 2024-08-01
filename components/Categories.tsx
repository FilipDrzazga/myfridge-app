import React, { useContext, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

import { AppContext } from "../context/AppContext";
import Loader from "./Loader";
import Product from "./Product";
import NoData from "./NoData";

const Categories = ({ route }) => {
  const ctxApp = useContext(AppContext);
  const isLoading = useMemo(() => ctxApp.loader, [ctxApp.loader]);

  const filterProduct = () => {
    if (ctxApp.state) {
      const productByCompartment = ctxApp.state.filter((item) => item.compartment === ctxApp.activeCompartmentTab);
      const productByCategory = productByCompartment.filter((item) => {
        return item.category === route.name || item.categoryAll === route.name ? item : null;
      });
      return productByCategory;
    }
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        contentContainerStyle={{ gap: 10 }}
        data={filterProduct()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Product product={item} />}
        itemLayoutAnimation={LinearTransition.delay(100)}
        ListEmptyComponent={() => {
          if (isLoading) {
            return (
              <Loader
                additionalStyle={{
                  width: "100%",
                  height: 650,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              />
            );
          } else {
            return <NoData />;
          }
        }}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                flexDirection: "row",
                gap: 3,
                width: "100%",
                height: 100,
                padding: 12,
                borderRadius: 10,
              }}
            ></View>
          );
        }}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 10 },
});
