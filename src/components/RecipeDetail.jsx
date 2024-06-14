import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeDetail({ recipes }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const recipe = recipes.find(recipe => recipe.id === id);

    if (!recipe) {
        return <div>Retsept topilmadi</div>;
    }

    const handleBack = () => {
        navigate(-1);   
    };

    return (
        <div className="recipeDetail">
            <div className='detailRecipeImgs'>
                <h3>Recipe elements</h3>
                <span className='detailImg'>
                    {recipe.images.map((image, index) => (
                        <img className='recipeElementImg' key={index} src={image} alt={`Recipe ${index + 1}`} />
                    ))}
                </span>
            </div>
            <h2 className='detailTitle'>{recipe.title}</h2>
            <div className="detailIngrediens">
                <span>Ingredients:</span>
                <ul className='detailIngredientsUl'>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
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
            <button className='detailBackBtn' onClick={handleBack}>Back</button>
        </div>
    );
}

export default RecipeDetail;
