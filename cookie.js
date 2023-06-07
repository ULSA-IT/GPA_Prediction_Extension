var numberOfElements = document.querySelectorAll(
  "#grdDiemDaTichLuy > tbody>tr"
).length;
for (let index = 2; index <= numberOfElements; index++) {
  var numberOfElementstd = document.querySelectorAll(
    "#grdDiemDaTichLuy > tbody>tr:nth-child(" + index + ") > td"
  ).length;
  if (numberOfElementstd == 9) {
    var ten = document.querySelector(
      "#grdDiemDaTichLuy > tbody>tr:nth-child(" + index + ") > td:nth-child(2)"
    ).innerHTML;
    var tin = document.querySelector(
      "#grdDiemDaTichLuy > tbody >tr:nth-child(" + index + ") > td:nth-child(3)"
    ).innerHTML;
    var diem = document.querySelector(
      "#grdDiemDaTichLuy > tbody >tr:nth-child(" + index + ") > td:nth-child(4)"
    ).innerHTML;
    console.log(ten + "  " + tin + "  " + diem);
  } else if (numberOfElementstd == 10) {
    var ten = document.querySelector(
      "#grdDiemDaTichLuy > tbody>tr:nth-child(" + index + ") > td:nth-child(3)"
    ).innerHTML;
    var tin = document.querySelector(
      "#grdDiemDaTichLuy > tbody >tr:nth-child(" + index + ") > td:nth-child(4)"
    ).innerHTML;
    var diem = document.querySelector(
      "#grdDiemDaTichLuy > tbody >tr:nth-child(" + index + ") > td:nth-child(5)"
    ).innerHTML;
    console.log(ten + "  " + tin + "  " + diem);
  } else {
    var ten = document.querySelector(
      "#grdDiemDaTichLuy > tbody>tr:nth-child(" + index + ") > td:nth-child(4)"
    ).innerHTML;
    var tin = document.querySelector(
      "#grdDiemDaTichLuy > tbody >tr:nth-child(" + index + ") > td:nth-child(5)"
    ).innerHTML;
    var diem = document.querySelector(
      "#grdDiemDaTichLuy > tbody >tr:nth-child(" + index + ") > td:nth-child(6)"
    ).innerHTML;
    console.log(ten + "  " + tin + "  " + diem);
  }
}
