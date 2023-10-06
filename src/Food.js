import { useState, useEffect } from "react"
import axios from "axios";
import logo from './ruoka.jpg'


const API_KEY = 'e8538575a5f94e0d9e3c8208cd4f5a71';

const Food = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const Search = async () => {
        setLoading(true);
    
        try {
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}`
          );
          setRecipes(response.data.results);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
    
      const handleRecipeClick = async (recipeId) => {
        try {
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
          );
          setSelectedRecipe(response.data);
        } catch (error) {
        }
      };

        useEffect(() => {
    setSelectedRecipe(null);
  }, [query]);
  return (
    <div id="container">
      <img className="logo" src={logo} alt="Logo" />
      <h1>Recipe Search</h1>
      <input id="container2"
        type="text"
        placeholder="Search for recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button id="search" onClick={Search}>Search</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {recipes.map((recipe) => (
              <li
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe.id)}
                style={{ cursor: 'pointer' }}
              >
                {recipe.title}
              </li>
            ))}
          </ul>
          {selectedRecipe && (
            <div>
              <h2>{selectedRecipe.title}</h2>
              <p>Ready in {selectedRecipe.readyInMinutes} minutes</p>
              <p>Servings: {selectedRecipe.servings}</p>
              <img id="image" src={selectedRecipe.image} alt={selectedRecipe.title} />
              <h3>Ingredients</h3>
              <ul>
                {selectedRecipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};
   

  

    export default Food;
