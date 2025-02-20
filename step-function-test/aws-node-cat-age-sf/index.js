module.exports.handler = async (event) => {
  const mult = 7;
  var catAge = mult * event.age;
  console.log("Recived event:", JSON.stringify(event, null, 2));
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: catAge,
        input: event,
      },
      null,
      2
    ),
  };
};
