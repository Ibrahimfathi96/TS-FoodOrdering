import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { Product } from "../types";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { useSegments } from "expo-router";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = (props: ProductListItemProps) => {
  const { product } = props;
  const { id, name, price, image } = product;
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: image || defaultPizzaImage }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "50%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});

export default ProductListItem;
