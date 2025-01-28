import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        time: '',
        file: null // Initialize all fields
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:3000/recipe/${id}`)
                .then(response => {
                    const res = response.data;
                    setRecipeData({
                        title: res.title,
                        ingredients: res.ingredients.join(","), // Convert array to string
                        instructions: res.instructions,
                        time: res.time,
                        file: null // Reset file field
                    });
                });
        };
        getData();
    }, [id]); // Add `id` to dependency array

    const onHandleChange = (e) => {
        let val;
        if (e.target.name === "ingredients") {
            val = e.target.value.split(","); // Convert string to array
        } else if (e.target.name === "file") {
            val = e.target.files[0];
        } else {
            val = e.target.value;
        }
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }));
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", recipeData.title);
        formData.append("ingredients", JSON.stringify(recipeData.ingredients));
        formData.append("instructions", recipeData.instructions);
        formData.append("time", recipeData.time);
        if (recipeData.file) {
            formData.append("file", recipeData.file);
        }

        await axios.put(`http://localhost:3000/recipe/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': 'bearer ' + localStorage.getItem("token")
            }
        }).then(() => navigate("/myRecipe"));
    };

    return (
        <div className='container'>
            <form className='form' onSubmit={onHandleSubmit}>
                <div className='form-control'>
                    <label>Title</label>
                    <input 
                        type="text" 
                        className='input' 
                        name="title" 
                        onChange={onHandleChange} 
                        value={recipeData.title} 
                    />
                </div>
                <div className='form-control'>
                    <label>Time</label>
                    <input 
                        type="text" 
                        className='input' 
                        name="time" 
                        onChange={onHandleChange} 
                        value={recipeData.time} 
                    />
                </div>
                <div className='form-control'>
                    <label>Ingredients</label>
                    <textarea 
                        className='input-textarea' 
                        name="ingredients" 
                        rows="5" 
                        onChange={onHandleChange} 
                        value={recipeData.ingredients} 
                    />
                </div>
                <div className='form-control'>
                    <label>Instructions</label>
                    <textarea 
                        className='input-textarea' 
                        name="instructions" 
                        rows="5" 
                        onChange={onHandleChange} 
                        value={recipeData.instructions} 
                    />
                </div>
                <div className='form-control'>
                    <label>Recipe Image</label>
                    <input 
                        type="file" 
                        className='input' 
                        name="file" 
                        onChange={onHandleChange} 
                    />
                </div>
                <button type="submit">Edit Recipe</button>
            </form>
        </div>
    );
}