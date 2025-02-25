const AWS = require('aws-sdk');
AWS.config.update({region: process.env.REGION});
const s3 = new AWS.S3();

module.exports.getQuotes = (event, context, callback) => {
    console.log("Incoming:::", event);

    s3.getObject({
        Bucket: 'my-json-daily-quotes',
        Key: 'quotes.json'
    },
    function (error, data) {
        if (error) {
            console.error(error);
            callback(new Error(error));
            return;
        } else {
            const json = JSON.parse(data.Body);
            console.log("JSON:::", json);
            const response = {
                headers:{
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "*"
                },
                statusCode: 200,
                body: JSON.stringify(json),
            };
            callback(null, response);
        }
    }
);
};