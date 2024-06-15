import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RecipePreview() {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state || !state.recipe) {
        return <div>Retsept topilmadi</div>;
    }

    const { recipe } = state;

    return (
        <div className="recipeDetail">
            <div className='detailRecipeImgs'>
                <h3>Recipe elements</h3>
                <span className='detailImg'>
                    {recipe.images && recipe.images.length > 0 ? (
                        recipe.images.map((image, index) => (
                            <img className='recipeElementImg' key={index} src={image} alt={`Recipe ${index + 1}`} />
                        ))
                    ) : (
                        <p>No images available</p>
                    )}
                </span>
            </div>
            <h2 className='detailTitle'>{recipe.title}</h2>
            <div className="detailIngrediens">
                <span>Ingredients:</span>
                <ul className='detailIngredientsUl'>
                    {recipe.ingredients && recipe.ingredients.length > 0 ? (
                        recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))
                    ) : (
                        <p>No ingredients available</p>
                    )}
                </ul>
            </div>
            <div className="detailCookingTime">
                <span>Cooking time:</span>
                <p>{recipe.cookingTime}</p>
            </div>
            <div>
                <div className="detailMethod">
                    <h3>Method</h3>
                    <p>{recipe.description}</p>
                </div>
            </div>
            <button className='detailBackBtn' onClick={() => navigate(-1)}>Back</button>
        </div>
    );
}

export default RecipePreview;
