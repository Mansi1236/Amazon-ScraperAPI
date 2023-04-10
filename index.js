const express = require('express');
const request = require('request-promise');


const app = express();

const PORT = process.env.PORT || 5000;


// const apiKey = '091a3727fae7c1205437e15f09aa8b41';

const generateScraperURL = (apikey) => `http://api.scraperapi.com?apikey=${apikey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
 res.send('Welcome New Mansi');


});
// GET products' info with product id
app.get(
'/products/:productId', async (req, res) => {
const {productId} = req.params;
const {apikey} = req.query;
try{
const response = await request(`${generateScraperURL(apikey)}&url=https://www.amazon.com/dp/${productId}`);
res.json(JSON.parse(response));
}
catch(error){
res.json(error);
}

});

app.get(
    '/products/:productId/offers', async (req, res) => {
    const {productId} = req.params;
    const {apikey} = req.query;
    try{
    const response = await request(`${generateScraperURL(apikey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
    res.json(JSON.parse(response));
    }
    catch(error){
    res.json(error);
    }
    
    });

    // GET product reviews 
    app.get(
        '/products/:productId/reviews', async (req, res) => {
        const {productId} = req.params;
        const {apikey} = req.query;
        try{
        const response = await request(`${generateScraperURL(apikey)}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response));
        }
        catch(error){
        res.json(error);
        }
        
        });

// GET new releases
        app.get(
            '/new-releases', async (req, res) => {
            const {apikey} = req.query;
            try{
            const response = await request(`${generateScraperURL(apikey)}&url=https://www.amazon.com/gp/}`);
            res.json(JSON.parse(response));
            }
            catch(error){
            res.json(error);
            }
            
            });

            // GET bestsellers
            app.get(
                '/bestsellers', async (req, res) => {
               const {apikey} = req.query;
                try{
                const response = await request(`${generateScraperURL(apikey)}&url=https://www.amazon.com/gp/}`);
                res.json(JSON.parse(response));
                }
                catch(error){
                res.json(error);
                }
                });

    // GET search results 
    app.get(
        '/search/:searchquery', async (req, res) => {
       const {apikey} = req.query;
        try{
        const response = await request(`${generateScraperURL(apikey)}&url=https://www.amazon.com/s?k=${searchquery}}`);
        res.json(JSON.parse(response));
        }
        catch(error){
        res.json(error);
        }
        });


app.listen(PORT, () => console.log(`Server is running on ${ PORT}`));
