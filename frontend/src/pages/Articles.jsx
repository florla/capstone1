import React, { useState, useEffect } from 'react';
import axios from 'axios';
import placeholderImage from '../assets/article_defaultimg.jpeg'; 
import '../styles/Articles.css';

const Articles = () => {
    const [selectedCategory, setSelectedCategory] = useState('financial literacy education');
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;

    const handleCategorySelect = async (category) => {
        setSelectedCategory(category);
    };

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/articles?category=${selectedCategory}`);
                setArticles(response.data.articles);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, [selectedCategory]); 

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className="category-buttons">
                <button className="waves-effect waves-light btn" onClick={() => handleCategorySelect('financial literacy education')}>Financial Education Wellness</button>
                <button className="waves-effect waves-light btn" onClick={() => handleCategorySelect('retirement savings')}>Retirement Savings</button>
                <button className="waves-effect waves-light btn" onClick={() => handleCategorySelect('financial budgeting')}>Financial Budgeting</button>
                <button className="waves-effect waves-light btn" onClick={() => handleCategorySelect('emergency savings')}>Emergency Savings</button>
                <button className="waves-effect waves-light btn" onClick={() => handleCategorySelect('credit card finance')}>Credit Card</button>
            </div>

            <div className="row">
                {currentArticles.map((article, index) => (
                    <div className="col s12 m6 l4" key={index}>
                        <div className="card" id="article-row">
                            <div className="card-image">
                                <img src={article.urlToImage || placeholderImage} alt={article.title} />
                            </div>
                            <div className="card-content">
                            <span className="card-title">{article.title}</span>
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

            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="waves-effect pagination-item">
                        <a onClick={() => setCurrentPage(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Articles;
