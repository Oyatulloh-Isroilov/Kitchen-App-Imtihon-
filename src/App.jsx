import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './components/Home';
import CreateRecipe from './components/CreateRecipe';
import RecipeDetail from './components/RecipeDetail';
import RecipePreview from './components/RecipePreview';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    const [user, loading, error] = useAuthState(auth);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        setRecipes(storedRecipes);
    }, []);

    const addRecipe = (recipe) => {
        const newRecipes = [...recipes, recipe];
        setRecipes(newRecipes);
        localStorage.setItem('recipes', JSON.stringify(newRecipes));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            {user && <Header user={user} />}
            <Routes>
                <Route path="/" element={user ? <Home recipes={recipes} setRecipes={setRecipes} /> : <Navigate to="/login" />} />
                <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="/create-recipe" element={user ? <CreateRecipe addRecipe={addRecipe} /> : <Navigate to="/login" />} />
                <Route path="/recipe/:id" element={user ? <RecipeDetail recipes={recipes} /> : <Navigate to="/login" />} />
                <Route path="/preview" element={user ? <RecipePreview /> : <Navigate to="/login" />} />
            </Routes>
            {user && <Footer />}
        </div>
    );
}

export default App;
