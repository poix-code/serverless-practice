"use strict";
const AWS = require('aws-sdk');
const ses = new AWS.SES();
exports.createContact = async (event, context) => {
  console.log("Received:::", event);
  const { to, from, subject, message } = JSON.parse(event.body);
  
  if (!to || !from || !subject || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Missing required fields',
        input: event
      }, null, 2)
    };
}

const params = {
  Destination: {
    ToAddresses: [to]
  },
  Message: {
    Body: {
      Text: { Data: message  }
    },
    Subject: { Data: subject },
  },
  Source: from
};

try {
  await ses.sendEmail(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Email sent successfully',
      success: true
    })
  };
} catch (error) {
  console.error(error);
  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'The email fail to send',
      success: false
    })
  };
}
};
