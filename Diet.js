import React, { useState } from 'react'
import Footer from './Footer'

const foodCategories = {
  "Vegetables & Fruits": [
    { name: "Broccoli", calories: 55, description: "High in fiber and vitamins", image: "/placeholder.jpg" },
    { name: "Apple", calories: 52, description: "Rich in antioxidants", image: "/placeholder.jpg" },
    { name: "Spinach", calories: 23, description: "Iron-rich leafy green", image: "/placeholder.jpg" },
  ],
  "Pasta & Grains": [
    { name: "Whole Wheat Pasta", calories: 124, description: "Complex carbohydrates", image: "/placeholder.jpg" },
    { name: "Brown Rice", calories: 111, description: "Nutrient-rich grain", image: "/placeholder.jpg" },
    { name: "Quinoa", calories: 120, description: "Complete protein grain", image: "/placeholder.jpg" },
  ],
  "Lean Meats": [
    { name: "Chicken Breast", calories: 165, description: "Low-fat protein", image: "/placeholder.jpg" },
    { name: "Turkey", calories: 157, description: "Lean protein source", image: "/placeholder.jpg" },
    { name: "Salmon", calories: 208, description: "Rich in omega-3", image: "/placeholder.jpg" },
  ],
}

const recipes = [
  {
    name: "Chicken & Quinoa Bowl",
    ingredients: ["Chicken Breast", "Quinoa", "Broccoli", "Spinach"],
    calories: 450,
    description: "High-protein healthy bowl",
    image: "/placeholder.jpg"
  },
  {
    name: "Salmon with Brown Rice",
    ingredients: ["Salmon", "Brown Rice", "Broccoli", "Spinach"],
    calories: 520,
    description: "Omega-3 rich meal",
    image: "/placeholder.jpg"
  },
  {
    name: "Turkey Pasta Salad",
    ingredients: ["Turkey", "Whole Wheat Pasta", "Spinach", "Apple"],
    calories: 480,
    description: "Light and nutritious",
    image: "/placeholder.jpg"
  },
]

function Diet() {
  const [selectedCategory, setSelectedCategory] = useState("Vegetables & Fruits")
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Nutritional Guide</h1>
        
        <h2 className="text-3xl font-semibold text-center mb-8">Food Categories</h2>
        
        <div className="flex justify-center gap-4 mb-12">
          {Object.keys(foodCategories).map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full transition-colors
                ${selectedCategory === category 
                  ? 'bg-white text-black shadow-md' 
                  : 'bg-transparent hover:bg-white/50'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-center mb-8">{selectedCategory}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {foodCategories[selectedCategory].map((food) => (
            <div key={food.name} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-24 h-24 object-cover rounded-full mb-4"
                />
                <h4 className="text-xl font-semibold mb-2">{food.name}</h4>
                <p className="text-gray-600 mb-2">{food.calories} kcal/100g</p>
                <p className="text-gray-500 text-sm">{food.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-semibold text-center mb-8">Healthy Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div 
              key={recipe.name} 
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-24 h-24 object-cover rounded-full mb-4"
                />
                <h4 className="text-xl font-semibold mb-2">{recipe.name}</h4>
                <p className="text-gray-600 mb-2">{recipe.calories} kcal/serving</p>
                <p className="text-gray-500 text-sm">{recipe.description}</p>
                {selectedRecipe?.name === recipe.name && (
                  <div className="mt-4">
                    <p className="font-medium mb-2">Ingredients:</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {recipe.ingredients.map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Diet