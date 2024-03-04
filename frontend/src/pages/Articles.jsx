import React, { useState, useEffect } from 'react';
import axios from 'axios';
import placeholderImage from '../assets/article_defaultimg.jpeg'; 
import '../styles/Articles.css';


const Articles = () => {
    // State to store the selected category
    const [selectedCategory, setSelectedCategory] = useState('financial education wellness');

    // state to store the fetched articles
    const [articles, setArticles] = useState([]);

    // state to store the current page number
    const [currentPage, setCurrentPage] = useState(1);

    const articlesPerPage = 6;

    // Handle category selection
    const handleCategorySelect = async (category) => {
        setSelectedCategory(category);
    };

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                // Fetch articles for the selected category
                const response = await axios.get(`http://localhost:5000/api/articles?category=${selectedCategory}`);
                setArticles(response.data.articles);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        // Fetch articles whenever the selected category changes
        fetchArticles();
    }, [selectedCategory]); 

    // Get current articles for the current page
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    // Calculate page numbers for pagination
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <h2>Articles</h2>

            {/* Category buttons */}
            <div className="category-buttons">
                <button className="category-button" onClick={() => handleCategorySelect('financial education wellness')}>Financial Education Wellness</button>
                <button className="category-button" onClick={() => handleCategorySelect('retirement savings')}>Retirement Savings</button>
                <button className="category-button" onClick={() => handleCategorySelect('financial budgeting')}>Financial Budgeting</button>
                <button className="category-button" onClick={() => handleCategorySelect('emergency savings')}>Emergency Savings</button>
                <button className="category-button" onClick={() => handleCategorySelect('credit score')}>Credit Score</button>
            </div>

            {/* Render articles */}
            <div className="row">
                {currentArticles.map((article, index) => (
                    <div className="col s12 m6 l4" key={index}>
                        <div className="card">
                            <div className="card-image">
                                <img src={article.urlToImage || placeholderImage} alt={article.title} />
                                <span className="card-title">{article.title}</span>
                            </div>
                            <div className="card-content">
                                <p>{article.description}</p>
                                <p>Author: {article.author}</p>
                                <p>Published At: {new Date(article.publishedAt).toLocaleString()}</p>
                            </div>
                            <div className="card-action">
                                <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="waves-effect">
                        <a onClick={() => setCurrentPage(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Articles;
