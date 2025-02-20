const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TODOS_TABLE = process.env.TODOS_TABLE;

module.exports.getTodo = (event, context, callback) => {
    const params = {
        TableName: TODOS_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
    };
    dynamoDb.get(params, (error, data) => {
        if (error) {
            console.error(error);
            callback(new Error(error));
            return;
        }
        const response = data.Item
        ? {
            statusCode: 200,
            body: JSON.stringify(data.Item),
        }: {
            statusCode: 404,
            body: JSON.stringify({ message: 'Todo not found' }),
        }
        callback(null, response);
    });
};