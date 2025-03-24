const AWS = require('aws-sdk');
const sns =  AWS.SNS();
const axios = require('axios');

const PublishToSNS = (message) =>
    sns.publish({
        Message: message,
        TopicArn: process.env.SNS_TOPIC_ARN
    }).promise();

const buildEmailBody = (id, form) => {
    return `
    Message: ${form.message}
    Name: ${form.name}
    Email: ${form.email}
    Service Information: ${id.sourceIp} - ${id.userAgent}
    `;
};

module.exports.staticMailer = async (event) => {
    console.log("EVENT:::", event);
    const data = JSON.parse(event.body);
    const emailBody = buildEmailBody(event.requestContext.identity, data);

    await PublishToSNS(emailBody);

    await axios.post(
        "https://l36en9kyhi.execute-api.us-east-1.amazonaws.com/dev/subscribe",
        {
            email: data.email
        }
    ).then(function(response) {
        console.log(response);
    }).catch(function(error) {
        console.log("Error subscribing user:::", error);
    });

    return {
        statusCode: 200,
        headers:{
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "*"
        },
        body: JSON.stringify({
            message: "OK"
        })
    };
};