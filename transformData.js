const fs = require("fs");
var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream(), // read file one line at a time
});

var stream = fs.createWriteStream("newQuestions.csv", { flags: "a" });
stream.once("open", (fd) => {}); // open once

lineReader.on("line", function (line) {
  const newLine = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g); // escape commas inside quotes
  const number = Number(newLine[3]); // format date
  const newDate = new Date(number);
  newLine.splice(3, 1, newDate.toISOString());
  if (newLine[6] === "0") {
    // format reported
    newLine.splice(6, 1, false);
  } else {
    newLine.splice(6, 1, true);
  }
  const string = newLine.join(","); // join back into string
  stream.write(string + "\r\n"); // write for each line
});
