import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Cards from './Cards';
import '../styles/components.css';

function Home({ recipes, setRecipes }) {
    const [user] = useAuthState(auth);

    return (
        <div className="home">
            <div className="hero">
                <h3 className='recipeText'>Recipes</h3>
                {recipes.length === 0 ? <p>No recipe</p> : <Cards data={recipes} setRecipes={setRecipes} />}
            </div>
        </div>
    );
}

export default Home;
