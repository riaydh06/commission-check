const fs = require("fs");
const Operation = require("./operation");
const User = require("./user");

fs.readFile(process.argv[2], "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }

  var operations = JSON.parse(jsonString);
  var users = [];

  operations
    .map((operation) => {
      return new Operation(operation);
    })
    .forEach((operation) => {
      var user = users.filter((user) => user.id === operation.user_id);
      if (user.length > 0) {
        user = user[0];
      } else {
        user = new User(operation.user_id, operation.user_type);
        users.push(user);
      }
      user.calculate(operation);
    });
});
