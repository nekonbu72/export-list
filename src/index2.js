"use strict";

document.querySelector("#myForm").addEventListener("submit", function(e) {
  e.preventDefault();
  console.log("hello");
  return false;
});
