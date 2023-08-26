import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");
const catImage = document.querySelector(".cat-image");
const catName = document.querySelector(".cat-name");
const catDescription = document.querySelector(".cat-description");
const catTemperament = document.querySelector(".cat-temperament");

axios.defaults.headers.common["x-api-key"] = "live_FyTNLdZSTaGhZFgoZAHYJzVgIhbVfVEHfbDWPfmJ6dRECKUVaHfGHBKJ5jBJJiem";

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError() {
  error.style.display = "block";
}

function hideError() {
  error.style.display = "none";
}

function clearData() {
  catInfo.style.display = "none";
  catImage.src = "";
  catName.textContent = "";
  catDescription.textContent = "";
  catTemperament.textContent = "";
}

async function handleBreedSelection(event) {
  clearData();
  showLoader();
  const breedId = event.target.value;
  try {
    const catData = await fetchCatByBreed(breedId);
    catImage.src = catData.url;
    catName.textContent = `Breed: ${catData.breeds[0].name}`;
    catDescription.textContent = `Description: ${catData.breeds[0].description}`;
    catTemperament.textContent = `Temperament: ${catData.breeds[0].temperament}`;
    catInfo.style.display = "block";
  } catch (e) {
    showError();
  } finally {
    hideLoader();
  }
}

async function updateBreeds() {
  try {
    const breeds = await fetchBreeds();
    breeds.forEach((breed, index) => {
      let option = document.createElement("option");
      option.value = index;
      option.innerHTML = breed.name;
      breedSelect.appendChild(option);
    });
    breedSelect.style.display = "block";
    breedSelect.addEventListener("change", handleBreedSelection);
  } catch (e) {
    showError();
  } finally {
    hideLoader();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateBreeds();
  hideError();
  hideLoader();
});