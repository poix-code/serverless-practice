const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');
const TODOS_TABLE = process.env.TODOS_TABLE;

module.exports.createTodo = (event, context, callback) => {
    const timestamp = new Date().getDate();
    const data = JSON.parse(event.body);
    const params = {
        TableName: TODOS_TABLE,
        Item: {
            id: uuid.v1(),
            todo: data.todo,
            checked: true,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    };
    dynamoDb.put(params, (error, data) => {
        if (error) {
            console.error(error);
            callback(new Error(error));
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Item),
        };
        callback(null, response);
    });
};