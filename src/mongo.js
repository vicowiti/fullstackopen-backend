const mongoose = require("mongoose");

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

// a19JSbjuljG85zeq
const password = process.argv[2];
const url = `mongodb+srv://viowiti12:${password}@cluster0.twl8q99.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const Number = mongoose.model("Number", phonebookSchema);

if (process.argv[3] && process.argv[4]) {
  const number = new Number({
    name: process.argv[3],
    number: process.argv[4],
  });

  number.save().then((result) => {
    console.log("note saved!");
    mongoose.connection.close();
  });
} else {
  Number.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((number) => {
      console.log(number.name, number.number);
    });

    mongoose.connection.close();
  });
}
