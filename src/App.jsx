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

function Layout({ children, user }) {
    return (
        <>
            <Header user={user} />
            <main>{children}</main>
            <Footer />
        </>
    );
}

function NoLayout({ children }) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}

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
            <Routes>
                <Route path="/" element={user ? <Layout user={user}><Home recipes={recipes} setRecipes={setRecipes} /></Layout> : <Navigate to="/login" />} />
                <Route path="/signup" element={user ? <Navigate to="/" /> : <NoLayout><Signup /></NoLayout>} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <NoLayout><Login /></NoLayout>} />
                <Route path="/create-recipe" element={user ? <Layout user={user}><CreateRecipe addRecipe={addRecipe} /></Layout> : <Navigate to="/login" />} />
                <Route path="/recipe/:id" element={user ? <Layout user={user}><RecipeDetail recipes={recipes} /></Layout> : <Navigate to="/login" />} />
                <Route path="/preview" element={user ? <Layout user={user}><RecipePreview /></Layout> : <Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;
