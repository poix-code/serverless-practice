const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TODOS_TABLE = process.env.TODOS_TABLE;

module.exports.deleteTodo = (event, context, callback) => {
    const params = {
        TableName: TODOS_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
    };
    dynamoDb.delete(params, (error, data) => {
        if (error) {
            console.error(error);
            callback(new Error(error));
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify({ message: 'Deletetion successfull' }),
        };
        callback(null, response);
    });
};