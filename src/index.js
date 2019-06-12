"use strict";

import XLSX from "xlsx";

document.querySelector("#myButton").addEventListener("click", () => {
  const url = "http://localhost:5050/ping?since=20190611JST&before=20190612JST";
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(myJSON => {
      console.log(myJSON);

      const date = new Date(),
        year = date.getFullYear(),
        month = ("00" + (date.getMonth() + 1)).slice(-2),
        day = ("00" + (date.getDay() + 1)).slice(-2),
        hour = ("00" + (date.getHours() + 1)).slice(-2),
        minute = ("00" + (date.getMinutes() + 1)).slice(-2),
        second = ("00" + (date.getSeconds() + 1)).slice(-2);

      const fileName = `exportlist${year}${month}${day}_${hour}${minute}${second}.xlsx`,
        sheetName = "Sheet1",
        book = XLSX.utils.book_new(),
        sheet = XLSX.utils.json_to_sheet(myJSON);
      XLSX.utils.book_append_sheet(book, sheet, sheetName);
      XLSX.writeFile(book, fileName);
    })
    .catch(error => {
      console.log(
        "There has been a problem with your fetch operation: ",
        error.message
      );
    });
});
