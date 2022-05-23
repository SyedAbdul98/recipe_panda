import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Button,
  Alert,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { Appbar } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import StarRating from "react-native-star-rating";

export default function App() {
  const address = "121-A";
  const API_ID = "bf0d8ebf";
  const API_KEY = "61e0a1d17667e73da2aeaabcd448330c";

  let [recipes, setRecipe] = useState([]);
  let [search, setSearch] = useState("Pasta");

  const fetchdata = async (title) => {
    const res = await fetch(
      `https://api.edamam.com/search?q=${title}&app_id=bf0d8ebf&app_key=61e0a1d17667e73da2aeaabcd448330c`
    );
    const data = await res.json();

    setRecipe(data.hits);
  };

  useEffect(() => {
    fetchdata(search);
  }, []);

  const searchTerm = (search) => {
    fetchdata(search);
  };

  return (
    // view - it is like a div(we use in web)... its map on UIView
    <SafeAreaView>
      <Appbar style={{ backgroundColor: "pink" }}>
        <Appbar.Content
          title="RecipePanda"
          style={{ alignItems: "flex-start" }}
        />
      </Appbar>
      <Appbar style={{ backgroundColor: "white" }}>
        <Appbar.Action icon="menu" onPress={() => {}} />
        <Appbar.Content title={address} style={{ alignItems: "start" }} />
        <Appbar.Action icon="cart" />
      </Appbar>
      <Searchbar
        placeholder="Search here"
        onChangeText={searchTerm}
        value={(search) => setSearch(search)}
        // onChange={(e) => fetchdata(e.target.value)}
      />
      <Text style={{ fontSize: 20, marginVertical: 5 }}>All time favorite</Text>
      <View style={{ width: "100%" }}>
        <FlatList
          horizontal
          data={recipes}
          renderItem={(element) => {
            return (
              <>
                <Image
                  source={{ uri: element.item.recipe.image }}
                  style={{
                    width: 150,
                    height: 150,
                    resizeMode: "cover",
                    margin: 7,
                    borderRadius: 20,
                  }}
                />
              </>
            );
          }}
          keyExtractor={(element, index) => index}
          style={{ padding: 2 }}
        ></FlatList>
        <StarRating disabled={false} maxStars={5} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: "1",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
