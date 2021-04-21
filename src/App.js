import React,{useEffect,useState} from 'react'

import './App.css';
import Recipe from './Recipe'
const App = () => {

const APP_ID = '778e38e6'
const APP_KEY = "3ce4220922c87538e3005dc578f4c0d4"

// const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`

const [recipes, setRecipes] = useState([])

const [search,setSearch] = useState("")

const [query,setQuery] = useState('chicken')

useEffect(async () => {
  
  getRecipes();

}, [query])

const getRecipes = async() => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data = await response.json();
  setRecipes(data.hits);
  // console.log(data.hits);
}

const updateSearch = e => {
  setSearch(e.target.value)
}

const getSearch = e => {
  e.preventDefault();
  setQuery(search)
  setSearch('');
}

return(
  <div className="App">
    <form onSubmit={getSearch} className="search-form" action="">
      <input type="text" className="search-bar" value={search} onChange={updateSearch} />
      <button className="search-button" type="submit">Search</button>

    </form>
    <div className="recipes">
    {recipes.map(recipe => (
      <Recipe 
      key={recipe.recipe.label}
      title={recipe.recipe.label} 
      calories={recipe.recipe.calories} 
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients} />
      
    ))}
    </div>
  </div>
)

}


export default App;
