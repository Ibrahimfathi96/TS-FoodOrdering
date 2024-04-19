import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React from "react";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";

const CreateProductScreen = () => {
  const [product, setProduct] = React.useState({
    name: "",
    price: "",
  });
  const [errors, setErrors] = React.useState("");
  const [image, setImage] = React.useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const resetInputFields = () => {
    setProduct({
      name: "",
      price: "",
    });
  };

  const validateInputs = () => {
    setErrors("");
    if (!product.name) {
      setErrors("Name is required");
      return false;
    }
    if (!product.price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(product.price))) {
      setErrors("Price must be a number");
      return false;
    }
    return true;
  };
  const onCreate = () => {
    if (!validateInputs()) {
      return;
    }
    console.warn("onProductCreate", product.name, product.price);
    // Save in the database
    resetInputFields();
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Create Product" }} />

      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.txtBtn}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={product.name}
        onChangeText={(text) => setProduct({ ...product, name: text })}
        placeholder="Name"
        style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={product.price}
        onChangeText={(text) => setProduct({ ...product, price: text })}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={{ color: "red" }}>{errors}</Text>

      <Button onPress={onCreate} text="Create" />
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: {
    color: "grey",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 6,
    marginTop: 6,
    marginBottom: 20,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  txtBtn: {
    alignSelf: "center",
    color: Colors.light.tint,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
