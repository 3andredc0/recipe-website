import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import  AddFoodRecipe  from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import RecipeDetails from './pages/RecipeDetails'
import Explore from './pages/Explore';
import ExternalRecipeDetails from './pages/ExternalRecipeDetails';


const getAllRecipes=async()=>{
  let allRecipes=[]
  await axios.get('http://localhost:3000/recipe').then(res=>{
    allRecipes=res.data
  })
  return allRecipes
}

const getMyRecipes = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let allRecipes = await getAllRecipes();
  return allRecipes.filter(item => item.createdBy === user.id); 
};

const getFavRecipes = async () => {
  try {
      const response = await axios.get("http://localhost:3000/favorite", {
          headers: {
              authorization: "bearer " + localStorage.getItem("token"),
          },
      });
      return response.data;
  } catch (err) {
      console.error("Error fetching favorites:", err);
      return [];
  }
};

const getRecipe = async ({ params }) => {
  try {
      // Fetch recipe
      const recipeResponse = await axios.get(`http://localhost:3000/recipe/${params.id}`);
      const recipe = recipeResponse.data;

      // Fetch author email
      const userResponse = await axios.get(`http://localhost:3000/user/${recipe.createdBy}`);
      
      return {
          ...recipe,
          email: userResponse.data.email,
          ingredients: Array.isArray(recipe.ingredients) ? 
              recipe.ingredients : 
              JSON.parse(recipe.ingredients) // Handle MySQL JSON storage
      };
  } catch (err) {
      console.error("Error loading recipe:", err);
      throw new Response("Recipe not found", { status: 404 });
  }
};

const router = createBrowserRouter([
  {
      path: "/",
      element: <MainNavigation />,
      children: [
          { path: "/", element: <Home />, loader: getAllRecipes },
          { path: "/myRecipe", element: <Home />, loader: getMyRecipes },
          { path: "/favRecipe", element: <Home />, loader: getFavRecipes },
          { path: "/addRecipe", element: <AddFoodRecipe /> },
          { path: "/editRecipe/:id", element: <EditRecipe /> },
          { path: "/recipe/:id", element: <RecipeDetails />, loader: getRecipe },
          { path: "/explore", element: <Explore /> },
          { path: "/explore/:id", element: <ExternalRecipeDetails /> }
      ]
  }
]);

export default function App() {
  return (
   <>
   <RouterProvider router={router}></RouterProvider>
   </>
  )
}