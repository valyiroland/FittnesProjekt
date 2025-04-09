import { useState, useEffect } from "react"
import axios from "axios"
import "./Diet.css"

export default function Diet() {
  // Kiválasztott kategória állapota (alapértelmezetten "Vegetables")
  const [selectedCategory, setSelectedCategory] = useState("Vegetables")

  // Hozzávalók listájának állapota
  const [foods, setFoods] = useState([])

  // Receptek listájának állapota
  const [recipes, setRecipes] = useState([])

  // Adagok száma receptenként
  const [servings, setServings] = useState({})

  // Maximum adagok száma
  const MAX_SERVINGS = 10

  // Ez a hook akkor fut le, amikor a `selectedCategory` értéke megváltozik
  useEffect(() => {
    // Adatok lekérő függvénye (aszinkron módon)
    const fetchData = async () => {
      try {
        // Kategórianévhez tartozó azonosítók
        const categoryIdMap = {
          Vegetables: 1,
          Fruits: 2,
          "Meats and fishes": 3,
          "Pasta and Breads": 4,
          "Nuts and Legumes": 5,
          Dairy: 6,
          Others: 7,
        }

        // Hozzávalók lekérése az API-ból a kiválasztott kategória alapján
        const foodResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/Ingredients/category/${categoryIdMap[selectedCategory]}`,
        )
        setFoods(foodResponse.data) // Lekért hozzávalók állapotba mentése

        // Receptek lekérése az API-ból
        const recipeResponse = await axios.get(`${process.env.REACT_APP_API_URL}/Recipes/Recipes`)

        // Inicializáljuk az adagok számát minden recepthez
        const initialServings = {}
        recipeResponse.data.forEach((recipe) => {
          initialServings[recipe.id] = 1 // Alapértelmezetten 1 adag
        })

        setServings(initialServings)
        setRecipes(recipeResponse.data) // Lekért receptek állapotba mentése
      } catch (error) {
        console.error("Hiba történt az adatok lekérésekor", error)
      }
    }

    // Adatlekérő függvény meghívása
    fetchData()
  }, [selectedCategory]) // Hook újrafut, ha megváltozik a kiválasztott kategória

  // Adagok számának növelése (maximum MAX_SERVINGS)
  const increaseServings = (recipeId) => {
    setServings((prev) => ({
      ...prev,
      [recipeId]: Math.min(MAX_SERVINGS, (prev[recipeId] || 1) + 1),
    }))
  }

  // Adagok számának csökkentése (minimum 1)
  const decreaseServings = (recipeId) => {
    setServings((prev) => ({
      ...prev,
      [recipeId]: Math.max(1, (prev[recipeId] || 1) - 1),
    }))
  }

  return (
    <div className="container mt-5 pt-5 pb-5">
      <h1 className="text-center mb-4">Nutritional Guide</h1>

      {/* Kategóriaválasztó legördülő lista */}
      <div className="d-flex justify-content-center mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)} // Kiválasztott kategória frissítése
          className="form-select border-dark w-auto text-center"
        >
          {/* Elérhető kategóriák megjelenítése */}
          {["Vegetables", "Fruits", "Meats and fishes", "Pasta and Breads", "Nuts and Legumes", "Dairy", "Others"].map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ),
          )}
        </select>
      </div>

      {/* Hozzávalók kártyák formájában történő megjelenítése */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 mb-5">
        {foods &&
          foods.map((food, index) => (
            <div key={food.id || index} className="col">
              <div className="card h-100 border-dark food-card">
                <div className="food-image-container">
                  <img className="card-img-top food-image" src={food.imageUrl || "/placeholder.svg"} alt={food.name} />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{food.name}</h5>
                  <p className="card-text">{food.calPer100g} kcal/100g</p>
                  <p className="card-text text-muted mt-auto">{food.description}</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Receptek megjelenítése */}
      <h2 className="font-weight-bold mb-4 text-center">Recipes</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
        {recipes &&
          recipes.map((recipe, index) => (
            <div key={recipe.id || index} className="col">
              <div className="card h-100 border-dark">
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">{recipe.description}</p>

                  {/* Adagok számának beállítása */}
                  <div className="servings-control mb-3">
                    <p className="font-weight-bold mb-2 text-center">Servings:</p>
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => decreaseServings(recipe.id)}
                        disabled={servings[recipe.id] <= 1}
                        aria-label="Decrease servings"
                      >
                        -
                      </button>
                      <span className="mx-3">{servings[recipe.id] || 1}</span>
                      <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => increaseServings(recipe.id)}
                        disabled={servings[recipe.id] >= MAX_SERVINGS}
                        aria-label="Increase servings"
                      >
                        +
                      </button>
                    </div>
                    {servings[recipe.id] >= MAX_SERVINGS && (
                      <small className="text-muted d-block mt-1 text-center">Maximum {MAX_SERVINGS} servings</small>
                    )}
                  </div>

                  <div>
                    <p className="font-weight-bold mb-2">Ingredients:</p>
                    <ul className="list-unstyled">
                      {/* Hozzávalók listázása vagy hibaüzenet ha nincs */}
                      {recipe.ingredientDetails && recipe.ingredientDetails.length > 0 ? (
                        recipe.ingredientDetails.map((ingredient, idx) => (
                          <li key={ingredient.name + idx} className="mb-1">
                            {ingredient.name}: {(ingredient.amount * (servings[recipe.id] || 1)).toFixed(0)} g
                          </li>
                        ))
                      ) : (
                        <li>No ingredients available</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
