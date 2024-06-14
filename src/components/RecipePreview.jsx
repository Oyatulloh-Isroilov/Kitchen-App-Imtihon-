import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RecipePreview() {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return <div>No data to preview</div>;
    }

    const { title, cookingTime, ingredients, images, method } = state;

    return (
        <div className="recipePreview">
            <h2>{title}</h2>
            <p>⌚ {cookingTime}</p>
            <div>
                <h3>Ingredients</h3>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Method</h3>
                <p>{method}</p>
            </div>
            <div>
                <h3>Images</h3>
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Recipe ${index + 1}`} />
                ))}
            </div>
            <button onClick={() => navigate('/create-recipe', { state })}>Back</button>
        </div>
    );
}

export default RecipePreview;
