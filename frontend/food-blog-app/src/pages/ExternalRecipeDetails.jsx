import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mealdbService from '/Users/andre.carneiro/Downloads/PIS_AndréCarneiro_TiagoCarneiro/RecipeWebsite/backend/services/mealdbService';

export default function ExternalRecipeDetails() {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        loadRecipe();
    }, [id]);

    const loadRecipe = async () => {
        try {
            const mealData = await mealdbService.getMealById(id);
            if (mealData) {
                setRecipe(mealdbService.normalizeMealData(mealData));
            }
        } catch (error) {
            console.error('Error loading recipe:', error);
        }
        setLoading(false);
    };

    if (loading) {
        return <div className="outer-container">Loading...</div>;
    }

    if (!recipe) {
        return <div className="outer-container">Recipe not found</div>;
    }

    return (
        <div className="outer-container">
            <div className="external-recipe-badge">
                TheMealDB Recipe
            </div>
            <h3 className="title">{recipe.title}</h3>
            <img 
                src={recipe.coverImage} 
                width="220px" 
                height="200px" 
                alt={recipe.title} 
            />
            <div className="recipe-details">
                <div className="ingredients">
                    <h4>Ingredients</h4>
                    <ul>
                        {recipe.ingredients.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="instructions">
                    <h4>Instructions</h4>
                    <div className="instructions-content">
                        {recipe.instructions.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}