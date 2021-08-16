import './App.css';
import { useState, useEffect, createContext, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AddRecipe } from './Components/AddRecipe';
import LearnMore from './Components/LearnMore';
import HomePage from './Components/HomePage';
import axios from 'axios';
import Navbar from './Components/NavBar';
import { EditRecipe } from './Components/EditRecipe';


const themeContext = createContext(null);
export { themeContext };

const recipesContext = createContext(null);
export { recipesContext };

function reducer(state, action) {
  switch (action.type) {
    case "START-RECIPE":
      return [...state, ...action.payload]
    case "ADD-RECIPE":
      return [...state, action.payload];
    case "DELETE-RECIPE":
      return state.filter((recipe) => recipe._id !== action.id);
    case "INGREDIENTS-DROP-DOWN":
      return state.map((item) => {
        if (item._id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    case "INGREDIENTS-DROP-UP":
      return state.map((item) => {
        if (item._id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    case "SEARCH-RECIPE":
      return [...action.payload];
    case "EDIT_RECIPE":
      return state.map((recipe) => {
        if (recipe._id === action.payload.id) {
          return action.payload;
        }
        return recipe;
      })
    default:
      return state;
  }
}

function App() {

  const [recipes, setRecipes] = useState([])

  const [state, dispatch] = useReducer(reducer, recipes);

  useEffect(() => {
    axios.get("https://recipe-by-gowtham.herokuapp.com/recipe")
      .then((data) => {
        dispatch({
          type: "START-RECIPE",
          payload: data.data
        });
      })
  }, [])

  const [darkMode, setDarkMode] = useState(true);

  return (
    <Router>
      <themeContext.Provider value={{ darkMode, setDarkMode }} >
        <Navbar />
        <recipesContext.Provider value={{ state, dispatch }}>
          <Switch>
            <Route exact path='/' >
              <HomePage />
            </Route>
            <Route exact path="/add"  >
              <AddRecipe />
            </Route>
            <Route exact path="/learnmore/:id">
              <LearnMore />
            </Route>
            <Route exact path="/edit/:id">
              <EditRecipe />
            </Route>
            <Route>
              {
                <div className="center">
                  <h2>404</h2>
                  <h4>Thw resource you are trying to access is not found.</h4>
                </div>
              }
            </Route>
          </Switch>
        </recipesContext.Provider>
      </themeContext.Provider>
    </Router>
  );
}

export default App;