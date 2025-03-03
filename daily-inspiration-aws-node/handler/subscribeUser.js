const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');
const USERS_TABLE = process.env.USERS_TABLE;

module.exports.subscribeUser = (event, context, callback) => {
    const data = JSON.parse(event.body);
    console.log("EVENT:::", data);
    const timestamp = new Date().getTime();
    if (typeof data.email !== 'string') {
        console.error(error);
        callback(new Error(error));
        return;
    }
    const params = {
        TableName: USERS_TABLE,
        Item: {
            userId: uuid.v4(),
            email: data.email,
            subscriber: true,
            createdAt: timestamp,
            updatedAt: timestamp,
        }
    };
    dynamoDb.put(params, (error, data) => {
        if (error) {
            console.error(error);
            callback(new Error(error));
            return;
        }
        const response = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "*"
            },
            statusCode: 200,
            body: JSON.stringify(data),
        };
        callback(null, response);
    });
};