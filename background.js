chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentTab = tabs[0];
    var url = new URL(currentTab.url);
    if (url.hostname === "http://sinhvien.ulsa.edu.vn") {
      chrome.browserAction.setPopup({ popup: "popup.html" });
    } else {
      alert("Only works with website abc.com");
    }
  });
});
