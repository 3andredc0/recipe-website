import { useState, useEffect } from 'react';
import mealdbService from '/Users/andre.carneiro/Downloads/PIS_AndréCarneiro_TiagoCarneiro/RecipeWebsite/backend/services/mealdbService';

export default function Explore() {
    const [meals, setMeals] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const categoriesData = await mealdbService.getCategories();
        setCategories(categoriesData);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        const searchResults = await mealdbService.searchMeals(searchTerm);
        setMeals(searchResults.map(meal => mealdbService.normalizeMealData(meal)));
        setLoading(false);
    };

    const handleCategorySelect = async (category) => {
        setLoading(true);
        setSelectedCategory(category);
        const categoryMeals = await mealdbService.getMealsByCategory(category);
        setMeals(categoryMeals.map(meal => ({
            ...mealdbService.normalizeMealData(meal),
            ingredients: [],
            instructions: ''
        })));
        setLoading(false);
    };

    return (
        <div className="container">
            <h2>Explore Recipes</h2>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search recipes..."
                    className="input"
                />
                <button type="submit">Search</button>
            </form>

            {/* Categories */}
            <div className="categories">
                <h3>Categories</h3>
                <div className="category-buttons">
                    {categories.map(category => (
                        <button
                            key={category.strCategory}
                            onClick={() => handleCategorySelect(category.strCategory)}
                            className={selectedCategory === category.strCategory ? 'active' : ''}
                        >
                            {category.strCategory}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="card-container">
                    {meals.map(meal => (
                        <div key={meal.id} className="card" onClick={() => window.location.href = `/explore/${meal.id}`}>
                            <img
                                src={meal.coverImage}
                                alt={meal.title}
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                            <div className="card-body">
                                <div className="title">{meal.title}</div>
                                {selectedCategory && (
                                    <div className="category">{selectedCategory}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}