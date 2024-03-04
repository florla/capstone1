// import express from 'express';
// import fetch from 'node-fetch';

// const router = express.Router();

// router.get('/articles', async (req, res) => {
//     // const searchTerms = ['financial budget wellness', 'retirement savings']; // search terms
//     const searchTerms = ['financial budget wellness', 'retirement savings', 'financial budgeting', 'emergency savings', 'credit score']; // search terms

//     const encodedSearchTerms = encodeURIComponent(searchTerms.join(' OR '));
//     const apiKey = 'c59ed3ef4c2a4751b2a96bc25e0bae71'; // Replace with your API key
//     const articleUrl = 'https://newsapi.org/v2/everything';
//     const url = `${articleUrl}?q=${encodedSearchTerms}&apiKey=${apiKey}`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// export default router;

import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/articles', async (req, res) => {
    let searchTerms = [];

    // Check if a category parameter is provided in the request
    if (req.query.category) {
        // Split the category parameter string by comma (if multiple categories are provided)
        searchTerms = req.query.category.split(',');
    } else {
        // Default search terms if no category is specified
        searchTerms = ['financial education wellness', 'retirement savings', 'financial budgeting', 'emergency savings', 'credit score'];
    }

    const encodedSearchTerms = encodeURIComponent(searchTerms.join(' OR '));
    const apiKey = 'c59ed3ef4c2a4751b2a96bc25e0bae71'; // Replace with your API key
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

export default router;