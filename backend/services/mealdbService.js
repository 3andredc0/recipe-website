const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const mealdbService = {
    // Search meals by name
    searchMeals: async (searchTerm) => {
        const response = await fetch(`${BASE_URL}/search.php?s=${searchTerm}`);
        const data = await response.json();
        return data.meals || [];
    },

    // Get meal details by ID
    getMealById: async (id) => {
        const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
        const data = await response.json();
        return data.meals?.[0] || null;
    },

    // Get meal categories
    getCategories: async () => {
        const response = await fetch(`${BASE_URL}/categories.php`);
        const data = await response.json();
        return data.categories || [];
    },

    // Get meals by category
    getMealsByCategory: async (category) => {
        const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
        const data = await response.json();
        return data.meals || [];
    },

    // Get random meal
    getRandomMeal: async () => {
        const response = await fetch(`${BASE_URL}/random.php`);
        const data = await response.json();
        return data.meals?.[0] || null;
    },

    // Normalize meal data to match our app's format
    normalizeMealData: (meal) => {
        return {
            id: meal.idMeal,
            title: meal.strMeal,
            instructions: meal.strInstructions,
            coverImage: meal.strMealThumb,
            time: "N/A", // TheMealDB doesn't provide cooking time
            ingredients: Array.from({ length: 20 }, (_, i) => {
                const ingredient = meal[`strIngredient${i + 1}`];
                const measure = meal[`strMeasure${i + 1}`];
                if (ingredient && ingredient.trim()) {
                    return `${measure?.trim() || ''} ${ingredient.trim()}`;
                }
                return null;
            }).filter(Boolean),
            isExternal: true // Flag to identify TheMealDB recipes
        };
    }
};

export default mealdbService;