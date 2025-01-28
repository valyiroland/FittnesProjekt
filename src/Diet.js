import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Diet() {
  const [selectedCategory, setSelectedCategory] = useState("Vegetables");
  const [foods, setFoods] = useState([]);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryIdMap = {
          "Vegetables": 1,
          "Fruits": 2,
          "Meats and fishes": 3,
          "Pasta": 4,
          "Nuts and Legumes": 5,
          "Dairy": 6,
          "Others": 7,
        };

        
        const foodResponse = await axios.get(`http://localhost:5071/Ingredients/category/${categoryIdMap[selectedCategory]}`);
        setFoods(foodResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [selectedCategory]); 

  return (
    <div className="container mt-5 pt-5 pb-5">
      <h1 className="d-flex justify-content-center">Nutritional Guide</h1>
      <br />
      <div className="d-flex justify-content-center mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="form-select border-dark w-auto"
        >
          {["Vegetables", "Fruits", "Meats and fishes", "Pasta", "Nuts and Legumes", "Dairy", "Others"].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4 mb-5">
        {foods && foods.map((food) => (
          <div key={food.id} className="col">
            <div className="card h-100 border-dark">
              <div className="card-body">
                <h5 className="card-title">{food.name}</h5>
                <p className="card-text">{food.calories} kcal/100g</p>
                <p className="card-text text-muted">{food.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* A receptes rész ideiglenesen ki van hagyva */}
      {/* 
      <h2 className="font-weight-bold mb-4">Recipes</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {recipes && recipes.map((recipe, index) => (
          <div key={recipe.id || index} className="col">
            <div className="card h-100 border-dark">
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">{recipe.calories} kcal/serving</p>
                <p className="card-text">{recipe.description}</p>
                <div>
                  <p className="font-weight-bold mb-2">Ingredients:</p>
                  <ul className="list-unstyled">
                    {recipe.ingredients && Array.isArray(recipe.ingredients) ? recipe.ingredients.map((ingredient, idx) => (
                      <li key={ingredient + idx}>{ingredient}</li> 
                    )) : <li>No ingredients available</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      */}
    </div>
  );
}
