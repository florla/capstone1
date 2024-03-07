import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/articles', async (req, res) => {
    let searchTerms = [];
    

    // check if a category parameter is provided in the request
    if (req.query.category) {
        // splitting the category parameter string by comma 
        searchTerms = req.query.category.split(',');
    } else {
        // default search terms if no category is specified
        searchTerms = ['financial literacy education', 'retirement savings', 'financial budgeting', 'emergency savings', 'credit card finance'];
    }


    const encodedSearchTerms = encodeURIComponent(searchTerms.join(' OR '));
     const apiKey = process.env.NEWS_API_KEY;
    const articleUrl = 'https://newsapi.org/v2/everything';
    const url = `${articleUrl}?q=${encodedSearchTerms}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// test json output: http://localhost:5000/api/articles
// localhost:5000/api/articles?category=financial education wellness
export default router;