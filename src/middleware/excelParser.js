const xlsx = require("xlsx");

const excelParser = (path) => {
  let fileData = xlsx.readFile(path);
  let sheetName = fileData.SheetNames[0];
  let sheetValue = fileData.Sheets[sheetName];
  let excelToJson = xlsx.utils.sheet_to_json(sheetValue);
  return excelToJson;
};

module.exports = excelParser;
