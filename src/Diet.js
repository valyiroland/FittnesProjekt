import React, { useState } from 'react';

const foodCategories = {
  "Vegetables & Fruits": [
    { name: "Broccoli", calories: 55, description: "High in fiber and vitamins" },
    { name: "Apple", calories: 52, description: "Rich in antioxidants" },
    { name: "Spinach", calories: 23, description: "Iron-rich leafy green" },
    {
      name: "Carrots",
      calories: 41,
      description: "Crunchy and sweet, high in beta-carotene.",
    },
    {
      name: "Cucumber",
      calories: 16,
      description: "Refreshing and hydrating vegetable.",
    },
    {
      name: "Tomatoes",
      calories: 18,
      description: "Juicy and rich in antioxidants.",
    },
    {
      name: "Red Bell Peppers",
      calories: 31,
      description: "Sweet and loaded with vitamin C.",
    },
    {
      name: "Avocado",
      calories: 160,
      description: "Creamy fruit rich in healthy fats.",
    },
    {
      name: "Asparagus",
      calories: 20,
      description: "Low-calorie veggie with a unique flavor.",
    },
    {
      name: "Onion",
      calories: 40,
      description: "Adds a savory base to many dishes.",
    },
    {
      name: "Garlic",
      calories: 4,
      description: "Bold flavor and numerous health benefits.",
    }
  ],
  "Pasta & Grains": [
    { name: "Whole Wheat Pasta", calories: 124, description: "Complex carbohydrates" },
    { name: "Brown Rice", calories: 111, description: "Nutrient-rich grain" },
    { name: "Quinoa", calories: 120, description: "Complete protein grain" },
  ],
  "Lean Meats": [
    { name: "Chicken Breast", calories: 165, description: "Low-fat protein" },
    {
      name: "Turkey",
      calories: 170,
      description: "Lower fat alternative to ground beef.",
    },
    {
      name: "Salmon Fillet",
      calories: 206,
      description: "Rich in omega-3 fatty acids and protein.",
    },
    {
      name: "Ground Pork",
      calories: 242,
      description: "Versatile meat used in various cuisines.",
    }
    
  ],
};

const recipes = [
  {
    name: "Chicken & Quinoa Bowl",
    ingredients: ["Chicken Breast", "Quinoa", "Broccoli", "Spinach"],
    calories: 450,
    description: "High-protein healthy bowl",
  },
  {
    name: "Salmon with Brown Rice",
    ingredients: ["Salmon", "Brown Rice", "Broccoli", "Spinach"],
    calories: 520,
    description: "Omega-3 rich meal",
  },
  {
    name: "Turkey Pasta Salad",
    ingredients: ["Turkey", "Whole Wheat Pasta", "Spinach", "Apple"],
    calories: 480,
    description: "Light and nutritious",
  },
  {
    name: "Vegetable Lentil Soup",
    ingredients: ["Lentils", "Carrots", "Celery", "Tomatoes", "Onion", "Garlic", "Vegetable Broth"],
    calories: 250,
    description: "A warm and comforting soup full of fiber and protein.",
  },
  {
    name: "Grilled Salmon & Asparagus",
    ingredients: ["Salmon Fillet", "Asparagus", "Olive Oil", "Lemon", "Garlic"],
    calories: 400,
    description: "A simple yet delicious meal rich in omega-3 fatty acids.",
  },
  {
    name: "Cabbage Rolls (Töltött Káposzta)",
    ingredients: ["Cabbage Leaves", "Ground Pork", "Rice", "Sauerkraut", "Tomato Sauce", "Onion"],
    calories: 360,
    description: "A classic Hungarian dish with a healthier twist.",
  },
  {
    name: "Avocado Toast with Eggs",
    ingredients: ["Whole Grain Bread", "Avocado", "Eggs", "Lemon Juice", "Salt", "Pepper"],
    calories: 300,
    description: "A quick and nutritious breakfast or snack option.",
  },
  {
    name: "Greek Salad",
    ingredients: ["Cucumber", "Tomatoes", "Feta Cheese", "Red Onion", "Olives", "Olive Oil"],
    calories: 200,
    description: "A refreshing Mediterranean-inspired salad.",
  },
  {
    name: "Stuffed Bell Peppers",
    ingredients: ["Red Bell Peppers", "Ground Turkey", "Brown Rice", "Tomato Sauce", "Onion", "Garlic"],
    calories: 320,
    description: "A hearty and flavorful dish, packed with nutrients and perfect for a balanced meal.",
  }
  
];

export default function Diet() {
  const [selectedCategory, setSelectedCategory] = useState("Vegetables & Fruits");

  return (
    <div className="container mt-5 pt-5 pb-5"> {/* Added top padding for fixed navbar */}
      <h1 className="d-flex justify-content-center">Nutritional Guide</h1>
      <br/>
    <div className="d-flex justify-content-center mb-4">
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="form-select border-dark w-auto"
        >
          {Object.keys(foodCategories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4 mb-5">
        {foodCategories[selectedCategory].map((food) => (
          <div key={food.name} className="col">
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

      <h2 className="font-weight-bold mb-4">Recepies</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {recipes.map((recipe) => (
          <div key={recipe.name} className="col">
            <div className="card h-100 border-dark">
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">{recipe.calories} kcal/serving</p>
                <p className="card-text">{recipe.description}</p>
                <div>
                  <p className="font-weight-bold mb-2">Ingredients:</p>
                  <ul className="list-unstyled">
                    {recipe.ingredients.map((ingredient) => (
                      <li key={ingredient}>• {ingredient}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

