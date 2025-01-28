import { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

export default function RecipeItems() {
    const recipes = useLoaderData();
    const [allRecipes, setAllRecipes] = useState();
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.admin;
    const path = window.location.pathname === "/myRecipe";
    const showActions = path || isAdmin; // Combine path check with admin status

    // Fetch favorites when component mounts
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get("http://localhost:3000/favorite", {
                    headers: {
                        authorization: "bearer " + localStorage.getItem("token"),
                    },
                });
                setFavorites(response.data);
            } catch (err) {
                console.error("Error fetching favorites:", err);
            }
        };

        if (localStorage.getItem("token")) {
            fetchFavorites();
        }
    }, []);

    // Update displayed recipes
    useEffect(() => {
        setAllRecipes(recipes);
    }, [recipes]);

    const onDelete = async (id) => {
        await axios.delete(`http://localhost:3000/recipe/${id}`);
        setAllRecipes(recipes => recipes.filter(recipe => recipe.id !== id));
    };

    const favRecipe = async (item, e) => {
        e.stopPropagation();
        try {
            if (isFavorited(item.id)) {
                await axios.delete(`http://localhost:3000/favorite/${item.id}`, {
                    headers: {
                        authorization: "bearer " + localStorage.getItem("token"),
                    },
                });
            } else {
                await axios.post(`http://localhost:3000/favorite/${item.id}`, {}, {
                    headers: {
                        authorization: "bearer " + localStorage.getItem("token"),
                    },
                });
            }
            const response = await axios.get("http://localhost:3000/favorite", {
                headers: {
                    authorization: "bearer " + localStorage.getItem("token"),
                },
            });
            setFavorites(response.data);
        } catch (err) {
            console.error("Error toggling favorite:", err);
        }
    };

    const isFavorited = (recipeId) => {
        return favorites.some((fav) => fav.id === recipeId);
    };

    return (
        <>
            <div className='card-container'>
                {allRecipes?.map((item, index) => (
                    <div key={index} className='card' onClick={(e) => {
                        if (!e.target.closest('.icons, .action')) {
                            navigate(`/recipe/${item.id}`);
                        }
                    }}>
                        <img 
                            src={`http://localhost:3000/images/${item.coverImage}`} 
                            width="120px" 
                            height="100px" 
                            alt={item.title} 
                        />
                        <div className='card-body'>
                            <div className='title'>{item.title}</div>
                            <div className='icons'>
                                <div className='timer'>
                                    <BsStopwatchFill />{item.time}
                                </div>
                                {showActions ? (
                                    <div className='action'>
                                        <Link to={`/editRecipe/${item.id}`} className="editIcon">
                                            <FaEdit />
                                        </Link>
                                        <MdDelete 
                                            onClick={() => onDelete(item.id)} 
                                            className='deleteIcon' 
                                        />
                                    </div>
                                ) : (
                                    <FaHeart 
                                        onClick={(e) => favRecipe(item, e)}
                                        style={{ color: isFavorited(item.id) ? "red" : "" }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}