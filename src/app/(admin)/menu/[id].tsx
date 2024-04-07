import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("S");

  const { onAddItem } = useCart();

  const product = products.find((p) => p.id.toString() === id);

  const router = useRouter();

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const addToCart = () => {
    if (!product) {
      return;
    }
    onAddItem(product, selectedSize);
    router.push("/cart");
  };

  const { name, image, price } = product;
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: name }} />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text style={styles.price}>{name}</Text>
      <Text style={styles.price}>Price: ${price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;
