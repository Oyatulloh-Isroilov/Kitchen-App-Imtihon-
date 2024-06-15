    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import '../styles/components.css';
    import close from '../assets/images/close.svg';

    function Cards({ data, setRecipes }) {
        const navigate = useNavigate();

        const handleCardClick = (id) => {
            navigate(`/recipe/${id}`);
        };

        const handleDelete = (e, id) => {
            e.stopPropagation();
            const confirmed = window.confirm("Do you want to delete this recipe?");
            if (confirmed) {
                const updatedRecipes = data.filter(card => card.id !== id);
                setRecipes(updatedRecipes);
                localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
            }
        };

        const isNew = (createdTime) => {
            const now = new Date();
            const createdDate = new Date(createdTime);
            const diffHours = (now - createdDate) / (1000 * 60 * 60);
            return diffHours < 4;
        };

        return (
            <div className="cards">
                {data.map((card, index) => {
                    const descriptionPreview = card.description.split(' ').slice(0, 16).join(' ') + (card.description.split(' ').length > 16 ? '...' : '');
                    return (
                        <div key={index} className="card" onClick={() => handleCardClick(card.id)}>
                            <div className="cardInfo">
                                <h4>{card.title}</h4>
                                <p className='productDesc'>{descriptionPreview}</p>
                                <div className="productMinBar">
                                    {isNew(card.createdTime) && <span className="newLabel">! NEW</span>}
                                    <span>⌚ {card.cookingTime}</span>
                                </div>
                                <img src={close} alt="close icon" className="closeIcon" onClick={(e) => handleDelete(e, card.id)} />
                            </div>
                            <img className='productImg' src={card.images[0]} alt={card.title} />
                        </div>
                    );
                })}
            </div>
        );
    }

    export default Cards;
