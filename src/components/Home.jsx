import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Cards from './Cards';
import '../styles/components.css';

function Home({ recipes, setRecipes }) {
    const [user] = useAuthState(auth);

    useEffect(() => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        console.log('Stored Recipes:', storedRecipes); 

        if (storedRecipes.length === 0) {
            const initialRecipes = [
                {
                    id: '1',
                    title: 'Palov',
                    cookingTime: '45 daqiqa',
                    description: 'Palov juda mazali va tayyorlash oson bo`lgan ovqatdir. Palov O`zbekistonning milliy ovqatidir, tayyorlash uchun guruch, sabzi, go`sht, yog` masallig`lari kerak bo`ladi',
                    ingredients: ['Guruch', 'Sabzi', 'Go`sht', 'Yog`'],
                    images: ['https://cdn.tasteatlas.com/images/dishes/27db9824904b49ec8e4164ce73bafb12.jpg?w=600', 'https://arbuz.com/wp-content/uploads/2009/12/Uzbek-Palov.jpg', 'https://sokin.moy.su/_ph/194/436166003.jpg'],
                    createdTime: new Date().toISOString()
                },
                {
                    id: '2',
                    title: 'Sho`rva',
                    cookingTime: '1.3,2soat',
                    description: 'Sho`rva, O`zbekistonda mashhur va sevimli bir ovqatdir. Bu taom odatda go`sht, sabzavotlar va unli naryalardan iborat. Sho`rva oshxonada ko`p variantlarda pishiriladi va har bir oilada o`ziga xos retsepti bo`ladi.',
                    ingredients: ['Sabzi', 'Kartoshka', 'Yog', 'Go`sht',],
                    images: ['https://kartinki.pics/uploads/posts/2022-12/thumbs/1670424713_5-kartinkin-net-p-shurpa-kartinki-vkontakte-5.jpg', 'https://ferganatourism.uz/thumb/2/v4SvIoQPtzzx7mlgX_H1gg/1200r1000/d/shurpa-3.jpg', 'https://zira.uz/wp-content/uploads/2020/08/kai--natma-shurpa-5-1.jpg'],
                    createdTime: new Date().toISOString()
                },
                {
                    id: '3',
                    title: 'Mastava',
                    cookingTime: '30-40 min',
                    description: 'Mastava, O`bekistonda mashhur va sevimli bir oziq-ovqat turi. Bu taom odatda bug`doy otalari (yengil bug`doy), un, suv va sabbalanib qo`shiladi. Mastava, o`sha miqdorda protein va qollaniladigan ma`zadagi ko`p xam butlar.',
                    ingredients: ['Go`sht', 'Kartoshka', 'Yog`', 'Mosh'],
                    images: ['https://kartinki.pics/uploads/posts/2021-03/1616215267_20-p-mastava-uzbekskii-sup-yeda-foto-24.jpg', 'https://ferganatourism.uz/thumb/2/v4SvIoQPtzzx7mlgX_H1gg/1200r1000/d/shurpa-3.jpg', 'https://zira.uz/wp-content/uploads/2020/08/kai--natma-shurpa-5-1.jpg', 'https://kartinki.pics/uploads/posts/2021-03/1616215239_15-p-mastava-uzbekskii-sup-yeda-foto-18.jpg'],
                    createdTime: new Date().toISOString()
                }
            ];
            setRecipes(initialRecipes);
            localStorage.setItem('recipes', JSON.stringify(initialRecipes));
        } else {
            setRecipes(storedRecipes);
        }
    }, [setRecipes]);

    console.log('Recipes:', recipes); 

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
