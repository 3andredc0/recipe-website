import { useLoaderData } from 'react-router-dom';
import profileImg from '../assets/profile.png';

export default function RecipeDetails() {
    const recipe = useLoaderData();
    
    if (!recipe) {
        return <div className='outer-container'>Recipe not found</div>;
    }

    // Ensure ingredients is always an array
    const ingredients = Array.isArray(recipe.ingredients) ? 
        recipe.ingredients : 
        JSON.parse(recipe.ingredients || "[]");

    return (
        <div className='outer-container'>
            <div className='profile'>
                <img src={profileImg} width="50px" height="50px" alt="Profile" />
                <h5>{recipe.email || "Unknown author"}</h5>
            </div>
            <h3 className='title'>{recipe.title}</h3>
            {recipe.coverImage && (
                <img 
                    src={`http://localhost:3000/images/${recipe.coverImage}`} 
                    width="220px" 
                    height="200px" 
                    alt={recipe.title} 
                />
            )}
            <div className='recipe-details'>
                <div className='ingredients'>
                    <h4>Ingredients</h4>
                    <ul>
                        {ingredients.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className='instructions'>
                    <h4>Instructions</h4>
                    <div className='instructions-content'>
                        {recipe.instructions.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}