let searchbox = document.querySelector("#searchbox");
let searchbtn = document.querySelector("#search");
let receipebtndetails = document.querySelector("#recepi-details");
let main = document.querySelector(".main");

// Fetch recipes
let getmeal = async (query) => {
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  try {
    let response = await fetch(url);
    let data = await response.json();   //convert row data to the object oh json

    main.innerHTML = ""; // clear old results

    
    if (!data.meals) {                      // it will check if their are no recipe
      main.innerHTML = "<p>No recipes found.</p>";    
      return;
    }

    data.meals.forEach(food => {                            // loop through the  api meals
      const div = document.createElement("div");
      div.classList.add("myrecipe");

      div.innerHTML = `
        <img src="${food.strMealThumb}">                                 
        <h3>${food.strMeal}</h3>
        <p>${food.strArea}</p>
        <p>${food.strCategory}</p>
      `;

      const recepibtn = document.createElement("button");
      recepibtn.classList.add("recipebtn");
      recepibtn.innerText = "Recipe";

      recepibtn.addEventListener("click", () => {
        openrecipe(food);
        receipebtndetails.classList.add("show");
      });

      div.appendChild(recepibtn);
      main.appendChild(div);
    });

  } catch (error) {                                // if any error occures while fetching a  api it will shw the error message
    console.log(error);                     
  }
};

// Show recipe details
let openrecipe = (food) => {                                                               //this fucntion will return the recipe details
  receipebtndetails.innerHTML = `
    <button class="close-btn">X</button>
    <h2>${food.strMeal}</h2>
    <p><b>Category:</b> ${food.strCategory}</p>
    <p><b>Area:</b> ${food.strArea}</p>
    <p><b>Instructions:</b> ${food.strInstructions}</p>
    <img src="${food.strMealThumb}" width="250">

                                                                                                                
      ${food.strYoutube 
      ? `<p><a href="${food.strYoutube}" target="_blank">▶ Watch Recipe Video</a></p>` 
      : "<p>No video available</p>"
    }
                                

  `;                                                                                               // this code will   send u link of the recipe

  const closeBtn = receipebtndetails.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    receipebtndetails.classList.remove("show");
  });
};

// Search event
searchbtn.addEventListener("click", (evt) => {                                         // when this button is clicked get api fucntion is called 
  evt.preventDefault();
  let trimo = searchbox.value.trim();
  if (trimo) {
    getmeal(trimo);
  }
});
