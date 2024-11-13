
function gpa() {
  // Tạo một workbook mới
 var workbook = XLSX.utils.book_new();
 
 // Tạo một worksheet mới và đặt tiêu đề cột
 var worksheet = XLSX.utils.aoa_to_sheet([['Tên', 'Tín chỉ', 'Điểm hệ 10', 'Điểm hệ 4','Điểm chữ']]);
 
 var numberOfRows = document.querySelectorAll("#grdDiemDaTichLuy > tbody > tr").length;
 for (let index = 2; index <= numberOfRows; index++) {
  var checkbox = document.querySelector("#grdDiemDaTichLuy > tbody > tr:nth-child(" + index + ")  input[type='checkbox']");
  var checkgpa = checkbox.checked;

  if (!checkgpa) {
    var numberOfColumns = document.querySelectorAll("#grdDiemDaTichLuy > tbody > tr:nth-child(" + index + ") > td").length;
    var rowData = [];

    if (numberOfColumns === 9) {
      var ten = document.querySelector("#grdDiemDaTichLuy > tbody > tr:nth-child(" + index + ") > td:nth-child(2)").innerHTML;
      var tin = parseInt(document.querySelector("#grdDiemDaTichLuy > tbody > tr:nth-child(" + index + ") > td:nth-child(3)").innerHTML);
      var diem10 = parseFloat(document.querySelector("#grdDiemDaTichLuy > tbody > tr:nth-child(" + index + ") > td:nth-child(4)").innerHTML);
      var diem4 = parseFloat(document.querySelector("#grdDiemDaTichLuy > tbody > tr:nth-child(" + index + ") > td:nth-child(5)").innerHTML);
            var diemchu = document.querySelector("#grdDiemDaTichLuy > tbody > tr:nth-child(" + index + ") > td:nth-child(6)").innerHTML;
      if (!isNaN(diem10) && !isNaN(diem4)) {
        rowData = [ten, tin, diem10, diem4,diemchu];
      }
      
    } else if (numberOfColumns === 10) {
      var ten = document.querySelector("#grdDiemDaTichLuy > tbody > tr:nth-child(" + index + ") > td:nth-child(3)").innerHTML;
      var tin = parseInt(document.querySelector("#grdDiemDaTichLuy > tbody > tr:nth-child(" + index + ") > td:nth-child(4)").innerHTML);
      var diem10 = parseFloat(document.querySelector("#grdDiemDaTichLuy > tbody > tr:nth-child(" + index + ") > td:nth-child(5)").innerHTML);
      var diem4 = parseFloat(document.querySelector("#grdDiemDaTichLuy > tbody > tr:nth-child(" + index + ") > td:nth-child(6)").innerHTML);
            var diemchu = document.querySelector("#grdDiemDaTichLuy > tbody > tr:nth-child(" + index + ") > td:nth-child(7)").innerHTML;
      if (!isNaN(diem10) && !isNaN(diem4)) {
        rowData = [ten, tin, diem10, diem4,diemchu];
      }
     

    } else {
      var ten = document.querySelector("#grdDiemDaTichLuy > tbody > tr:nth-child(" + index + ") > td:nth-child(4)").innerHTML;
      var tin = parseInt(document.querySelector("#grdDiemDaTichLuy > tbody > tr:nth-child(" + index + ") > td:nth-child(5)").innerHTML);
      var diem10 = parseFloat(document.querySelector("#grdDiemDaTichLuy > tbody > tr:nth-child(" + index + ") > td:nth-child(6)").innerHTML);
      var diem4 = parseFloat(document.querySelector("#grdDiemDaTichLuy > tbody > tr:nth-child(" + index + ") > td:nth-child(7)").innerHTML);
            var diemchu = document.querySelector("#grdDiemDaTichLuy > tbody > tr:nth-child(" + index + ") > td:nth-child(8)").innerHTML;
      if (!isNaN(diem10) && !isNaN(diem4)) {
        rowData = [ten, tin, diem10, diem4,diemchu];
      }
      
    }
    
    if (rowData.length > 0) {
    XLSX.utils.sheet_add_aoa(worksheet, [rowData], { origin: -1 }); // Thêm dữ liệu vào worksheet
    }
  }
}

 XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách điểm'); // Đặt tên cho worksheet và thêm vào workbook
 
 // Ghi workbook vào một dạng dữ liệu Excel
 var excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
 
 // Tạo file Excel từ dữ liệu và tải xuống
 var blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 var url = URL.createObjectURL(blob);
 var link = document.createElement('a');
 link.href = url;
 link.download = 'diem.xlsx';
 link.click();
 }
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "runGpa") {
    gpa();
    sendResponse({ success: true }); // Gửi phản hồi thành công về background script
  }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "syncToggle") {
    sendResponse({ url: window.location.href, value: "true" }); // Example response
  } else if (request.message === "toggle") {
    // Handle the toggle message
    sendResponse({ success: true });
  }
});


 