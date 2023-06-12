chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "runGpa") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "runGpa" }, function(response) {
          // Xử lý phản hồi nếu cần thiết
        });
      }
    });
  }
});

