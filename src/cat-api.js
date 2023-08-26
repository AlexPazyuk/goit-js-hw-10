import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_FyTNLdZSTaGhZFgoZAHYJzVgIhbVfVEHfbDWPfmJ6dRECKUVaHfGHBKJ5jBJJiem";

export async function fetchBreeds() {
  const url = "https://api.thecatapi.com/v1/breeds";
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch breeds");
  }
}

export async function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  try {
    const response = await axios.get(url);
    return response.data[0];
  } catch (error) {
    throw new Error("Failed to fetch cat by breed");
  }
}
