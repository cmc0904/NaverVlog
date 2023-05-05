// var express = require('express');

// var client_id = 'Ydwcz1YFp7JoHpU9UmUT';
// var client_secret = 'YZUWax0apy';

// var api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query); // JSON 결과
// var request = require('request');
// var options = {
//     url: api_url,
//     headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}

// };
// request.get(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body)
//         var jsonObj = JSON.parse(body); 
//         console.log(jsonObj['items'])
//     } else {
//         res.status(response.statusCode).end();
//         console.log('error = ' + response.statusCode);
//     }
// });



module.exports = function(app)
{
    app.get('/', (req, res, next) => {
        res.render('get')
    });

    app.post('/submit', function (req, res, next) {
        // res.send(JSON.stringify(req.body));

        // var express = require('express');
        // console.log(req.body.user)
        var client_id = 'Ydwcz1YFp7JoHpU9UmUT';
        var client_secret = 'YZUWax0apy';

        var api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.body.user); // JSON 결과
        var request = require('request');
        var options = {
            url: api_url,
            headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}

        };
        request.get(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body)
                var jsonObj = JSON.parse(body); 
                console.log(jsonObj['items'])
                console.log(jsonObj['items'][0].title)
                // console.log(jsonObj[0]['title'])
                // console.log(jsonObj[0]['description'])
                // console.log(jsonObj[0]['postdate'])

                res.render('data', {
					len: jsonObj['items'].length,
					values: jsonObj['items'],
                    keyword: req.body.user
				})
            } else {
                res.status(response.statusCode).end();
                console.log('error = ' + response.statusCode);
            }
        });
    });
}