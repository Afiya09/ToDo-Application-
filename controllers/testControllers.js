const testingController = (req, res) => {
  res.status(200).send("<h1>Response from MVC Pa</h1>");
};

//export
module.exports = { testingController };
