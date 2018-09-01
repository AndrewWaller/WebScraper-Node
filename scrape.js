const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

// Write Headers
writeStream.write(`Title,Link,Date \n`);

request('http://codedemos.com/sampleblog/', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        $('.post-preview').each((i, lol) => {
            const title = $(lol)
                .find('.post-title')
                .text()
                .replace(/\s\s+/g, ''); // <---!!!! Regex magic
            const link = $(lol)
                .find('a')
                .attr('href');
            const date =$(lol)
                .find('.post-date')
                .text()
                .replace(/,/, ' ');
            //console.log(title, link, date);
            
        // Write Row to CSV
            writeStream.write(`${title},${link},${date} \n`);
        });

        console.log('Task Complete');


        /*const siteHeading = $('.site-heading');
        //console.log(siteHeading.html());
        //console.log(siteHeading.text());
        //const output = siteHeading.find('h1').text();
        //const output = siteHeading.children('h1').text();
        //const output = siteHeading.children('h1').next().text();
        //console.log(output);

        $('.nav-item a').each((i,lol) => {
            const item = $(lol).text();
            const link = $(lol).attr('href');

            console.log(item, link);
        });*/
    }
});