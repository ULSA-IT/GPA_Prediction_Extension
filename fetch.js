
function gpa() {
  const HEADERS = ['STT', 'Tên', 'Tín chỉ', 'Điểm hệ 10', 'Điểm hệ 4', 'Điểm chữ'];
  const TABLE_SELECTOR = '#grdDiemDaTichLuy > tbody > tr';
  
  // Column indices mapping based on total columns in row
  const COLUMN_MAPS = {
    9:  { ten: 2, tin: 3, diem10: 4, diem4: 5, diemchu: 6 },
    10: { ten: 3, tin: 4, diem10: 5, diem4: 6, diemchu: 7 },
    11: { ten: 4, tin: 5, diem10: 6, diem4: 7, diemchu: 8 }
  };

  // Helper function to safely get cell data
  function getCellData(row, columnIndex) {
    return row.querySelector(`td:nth-child(${columnIndex})`)?.innerHTML || '';
  }

  // Process a single row
function processRow(row, columnMap, index) {
  const ten = getCellData(row, columnMap.ten);
  const tin = parseInt(getCellData(row, columnMap.tin));
  const diem10 = parseFloat(getCellData(row, columnMap.diem10));
  const diem4 = parseFloat(getCellData(row, columnMap.diem4));
  const diemchu = getCellData(row, columnMap.diemchu);

  if (!isNaN(diem10) && !isNaN(diem4)) {
    return [index + 1, ten, tin, diem10, diem4, diemchu];
  }
  return null;
}

// Create workbook and worksheet
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.aoa_to_sheet([HEADERS]);

// Get all rows and process them
const rows = document.querySelectorAll(TABLE_SELECTOR);
let count = 0;
const processedData = Array.from(rows)
  .slice(1) // Skip header row
  .reduce((acc, row) => {
    // Skip if checkbox is checked
    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox?.checked) return acc;

    // Get column mapping based on number of columns
    const columnCount = row.querySelectorAll('td').length;
    const columnMap = COLUMN_MAPS[columnCount];
    if (!columnMap) return acc;

    // Process row and add to accumulator if valid
    const rowData = processRow(row, columnMap, count);
    if (rowData) {
      acc.push(rowData);
      count++;
    }
    
    return acc;
  }, []);

// Add all processed data to worksheet
if (processedData.length > 0) {
  XLSX.utils.sheet_add_aoa(worksheet, processedData, { origin: -1 });
}

// Find the maximum width of the first column
const maxWidth = Math.max(
  HEADERS[0].length,
  ...processedData.map(row => row[1].length)
);

// Set column width for the first column (A)
worksheet['!cols'] = [
  { wch: 8 },  // Default width
  { wch: maxWidth + 2 }, // Add space for subject name
  { wch: 8 },
  { wch: 8 },
  { wch: 8 }
];

// Add worksheet to workbook
XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách điểm');

// Create and download Excel file
const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
const blob = new Blob([excelData], { 
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
});

const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = 'diem_ca_nhan.xlsx';
link.click();

// Clean up
URL.revokeObjectURL(url);
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


 