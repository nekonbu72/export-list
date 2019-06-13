// "use strict";

import XLSX from "xlsx";

document.querySelector("#myForm").addEventListener("submit", e => {
  // 画面遷移をブロック
  e.preventDefault();

  const myDateGet = (val, offset = 0) => {
    return ("00" + (val + offset)).slice(-2);
  };

  const date = new Date(),
    year = date.getFullYear(),
    month = myDateGet(date.getMonth(), 1),
    day = myDateGet(date.getDate()),
    hour = myDateGet(date.getHours()),
    minute = myDateGet(date.getMinutes()),
    second = myDateGet(date.getSeconds());

  date.setDate(date.getDate() + 1);
  const day2 = myDateGet(date.getDate());
  // const myDate = document.querySelector("#myDate");
  // myDate.value = `${year}-${month}-${day}`;

  const url = `http://localhost:5050/ping?since=${year}${month}${day}JST&before=${year}${month}${day2}JST`;
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(myJSON => {
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
