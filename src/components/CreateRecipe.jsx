import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../styles/components.css';

function CreateRecipe({ addRecipe }) {
    const [title, setTitle] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [ingredientInput, setIngredientInput] = useState('');
    const [ingredientCost, setIngredientCost] = useState('');
    const [images, setImages] = useState([]);
    const [imageInput, setImageInput] = useState('');
    const [method, setMethod] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAddIngredient = () => {
        if (ingredientInput && ingredientCost) {
            setIngredients([...ingredients, { name: ingredientInput, cost: parseFloat(ingredientCost) }]);
            setIngredientInput('');
            setIngredientCost('');
        }
    };

    const handleAddImage = () => {
        if (imageInput && images.length < 4) {
            setImages([...images, imageInput]);
            setImageInput('');
        } else {
            setError('You can only add up to 4 images.');
        }
    };

    const handleSave = () => {
        if (!title || !cookingTime || !method || ingredients.length === 0 || images.length === 0 || !protein || !fat || !carbohydrates) {
            setError('Please fill all fields and add at least one ingredient, one image, and nutrient information.');
            return;
        }

        const newRecipe = {
            id: uuidv4(),
            title,
            cookingTime,
            description: method,
            ingredients,
            images,
            nutrients: {
                protein: parseFloat(protein),
                fat: parseFloat(fat),
                carbohydrates: parseFloat(carbohydrates),
            },
            createdTime: new Date().toISOString()
        };

        addRecipe(newRecipe);
        navigate('/');
    };

    const handlePreview = () => {
        navigate('/preview', { state: { images, ingredients, nutrients: { protein, fat, carbohydrates } } });
    };

    return (
        <div className="recipeCreate">
            <h2>Add New Recipe</h2>
            <div className="recipeTitleBar">
                <label htmlFor="recipeTitle">Title:</label>
                <input
                    type="text"
                    id="recipeTitle"
                    placeholder='Enter your meal name'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="recipeTime">
                <label htmlFor="cookingTime">Cooking time:</label>
                <input
                    type="text"
                    id="cookingTime"
                    placeholder='Enter preparation time of your meal'
                    value={cookingTime}
                    onChange={(e) => setCookingTime(e.target.value)}
                />
            </div>
            <div className="recipeIngredients">
                <label htmlFor="ingredients">Ingredients:</label>
                <div className="ingInpBtn">
                    <input
                        type="text"
                        id="ingredientInput"
                        placeholder='Enter ingredient name'
                        value={ingredientInput}
                        onChange={(e) => setIngredientInput(e.target.value)}
                    />
                    <button className='addBtn' onClick={handleAddIngredient}>+</button>
                </div>
                <span>Ingredients:
                    {ingredients.length === 0 ? <span className='errorYet'> ! No ingredients yet</span> : (
                        <ul>
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient.name} - ${ingredient.cost.toFixed(2)}</li>
                            ))}
                        </ul>
                    )}
                </span>
            </div>
            <div className="recipeImages">
                <label htmlFor="images">Image URL:</label>
                <div className="imgInpBtn">
                    <input
                        type="text"
                        id="imageInput"
                        placeholder='Enter image URL'
                        value={imageInput}
                        onChange={(e) => setImageInput(e.target.value)}
                    />
                    <button className='addBtn' onClick={handleAddImage}>+</button>
                </div>
                <span className='recImgText'>Images:
                    {images.length === 0 ? <span className='errorYet'> ! No images yet</span> : (
                        <ul>
                            {images.map((image, index) => (
                                <li key={index}><img src={image} alt={`Recipe ${index + 1}`} /></li>
                            ))}
                        </ul>
                    )}
                </span>
            </div>
            <div className="recipeMethod">
                <label htmlFor="method">Method:</label>
                <textarea
                    id="method"
                    cols="30"
                    rows="10"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                ></textarea>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="createRecipeBtns">
                <button className='recipeBtnApply' onClick={handleSave}>Apply</button>
                <button className='recipeBtnPreview' onClick={handlePreview}>Preview</button>
            </div>
        </div>
    );
}

export default CreateRecipe;
