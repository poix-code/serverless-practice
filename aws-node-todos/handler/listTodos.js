const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TODOS_TABLE = process.env.TODOS_TABLE;
const uuid = require('uuid');

module.exports.listTodos = (event, context, callback) => {
    const params = {
        TableName: TODOS_TABLE,
    };
    dynamoDb.scan(params, (error, data) => {
        if (error) {
            console.error(error);
            callback(new Error(error));
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Items),
        };
        callback(null, response);
    });
};