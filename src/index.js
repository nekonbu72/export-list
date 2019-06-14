// "use strict";

import XLSX from "xlsx";

const myDateGet = (val, offset = 0) => {
  return ("00" + (val + offset)).slice(-2);
};

const today = new Date(),
  myDateElm = document.querySelector("#myDate");

(function() {
  const year = today.getFullYear(),
    month = myDateGet(today.getMonth(), 1),
    day = myDateGet(today.getDate());

  myDateElm.value = `${year}-${month}-${day}`;
})();

(function() {
  document.querySelector("#myForm").addEventListener("submit", e => {
    // 画面遷移をブロック
    e.preventDefault();

    const year = myDateElm.value.slice(0, 4),
      month = myDateElm.value.slice(5, 7),
      day = myDateElm.value.slice(8, 10);

    const mydate = new Date(year, month, day);
    mydate.setDate(today.getDate() + 1);
    const day2 = myDateGet(mydate.getDate());

    fetch(
      `http://localhost:5050/ping?since=${year}${month}${day}JST&before=${year}${month}${day2}JST`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(myJSON => {
        const year = today.getFullYear(),
          month = myDateGet(today.getMonth(), 1),
          day = myDateGet(today.getDate()),
          hour = myDateGet(today.getHours()),
          minute = myDateGet(today.getMinutes()),
          second = myDateGet(today.getSeconds());

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
})();
