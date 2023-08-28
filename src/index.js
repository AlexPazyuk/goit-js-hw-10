import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import Notiflix from "notiflix";
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css'

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const catInfo = document.querySelector(".cat-info");
const catImage = document.querySelector(".cat-image");
const catName = document.querySelector(".cat-name");
const catDescription = document.querySelector(".cat-description");
const catTemperament = document.querySelector(".cat-temperament");

axios.defaults.headers.common["x-api-key"] = "live_FyTNLdZSTaGhZFgoZAHYJzVgIhbVfVEHfbDWPfmJ6dRECKUVaHfGHBKJ5jBJJiem";

function slim() {
    new SlimSelect({
        select: '#breed-select'
    })
}

async function updateBreeds() {
  try {
    loader.style.display = "block";
    breedSelect.disabled = true;
    
    const breeds = await fetchBreeds();
    const breedOptions = breeds.map(breed => ({ value: breed.id, text: breed.name }));
    
      const optionElements = breedOptions.map(option => {
          const optionElement = document.createElement("option");
          optionElement.value = option.value;
          optionElement.textContent = option.text;
          return optionElement;
        
      }); 
    
    breedSelect.innerHTML = ''; // Очистити список перед додаванням нових елементів
    breedSelect.append(...optionElements);
    
    loader.style.display = "none";
    breedSelect.style.display = "block";
    breedSelect.disabled = false;
    
    slim();
  } catch (e) {
    Notiflix.Notify.failure("Failed to fetch breeds"); // Використання Notiflix для повідомлення про помилку
  }
}

breedSelect.addEventListener("change", async event => {
  clearData();
  loader.style.display = "block";
  
  try {
    const breedId = event.target.value;
    const catData = await fetchCatByBreed(breedId);
    displayCatInfo(catData);
  } catch (e) {
    Notiflix.Notify.failure("Failed to fetch cat by breed"); // Використання Notiflix для повідомлення про помилку
  } finally {
    loader.style.display = "none";
  }
});

function clearData() {
  catInfo.style.display = "none";
}

function displayCatInfo(catData) {
  catImage.src = catData.url;
  catName.textContent = `Breed: ${catData.breeds[0].name}`;
  catDescription.textContent = `Description: ${catData.breeds[0].description}`;
  catTemperament.textContent = `Temperament: ${catData.breeds[0].temperament}`;
  catInfo.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  updateBreeds();
  Notiflix.Notify.success("Breeds loaded successfully"); // Використання Notiflix для повідомлення про успішне завантаження
});

