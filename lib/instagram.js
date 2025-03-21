const axios = require('axios');
const cheerio = require('cheerio');

// Function to scrape the CSRF token
async function scrapeCsrfToken() {
    const url = 'https://igmate.com/';
    try {
        const { data, headers } = await axios.get(url);
        const $ = cheerio.load(data);

        // Extract the CSRF token from the meta tag
        const csrfToken = $('meta[name="csrf-token"]').attr('content');
        
        // Return the CSRF token and the cookies to use in subsequent requests
        return { csrfToken, cookies: headers['set-cookie'] };
    } catch (error) {
        console.error('Error scraping the CSRF token:', error);
        return { csrfToken: null, cookies: [] };
    }
}

async function instagram(instagramUrl) {
    try {
        const { csrfToken, cookies } = await scrapeCsrfToken();
        if (!csrfToken) return [];

        const url = 'https://igmate.com/geturl';
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'https://igmate.com',
            'Referer': 'https://igmate.com/',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': csrfToken, // Include the CSRF token here
            'Cookie': cookies.join('; ')  // Use cookies from the initial request
        };

        const response = await axios.post(url, { url: instagramUrl }, { headers });
        if (!response || !response.data || !response.data.result || !response.data.result.medias) return [];
        
        const media = response.data.result.medias[0];
        const downloadLinks = {
            type: media.type,
            username: response.data.result.username,
            quality: media.quality,
            url: media.url
        };

        return downloadLinks;
    } catch (error) {
        return [];
    }
}

module.exports = { instagram };