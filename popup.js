function getActiveTab(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    callback(tabs);
  });
}
window.onload = () => {
  const toggleBtn = document.querySelector("#togBtn");
  const switchBtn = document.querySelector(".switch");
  const warningText = document.querySelector(".warning");

  function handleToggle(value) {
    getActiveTab(function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          message: "toggle",
          value: value,
        },
        function (response) {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          } else {
            console.log("Toggle response:", response);
          }
        }
      );
    });
  }

  function syncToggle() {
    getActiveTab(function (tabs) {
      const tab = tabs[0];
      console.log(tab);
      if (tab.url && tab.url.startsWith("http://sinhvien.ulsa.edu.vn/KetQuaHocTap.aspx")) {
        document.getElementById('direct-link').style.display = 'none';
        document.getElementById('get-grade').style.display = 'block';
        switchBtn.style.display = "block";
        console.log("correct URL: ", tab.url);
      } else {
        document.getElementById('direct-link').style.display = 'block';
        document.getElementById('get-grade').style.display = 'none';
        switchBtn.style.display = "none";
        console.log("wrong URL: ", tab.url);
      }
    });
  }

  toggleBtn.addEventListener("change", (e) => {
    handleToggle(event.currentTarget.checked);
  });

  syncToggle();
};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("myButton").addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "runGpa" });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("page-link").addEventListener("click", function () {
    chrome.tabs.create({ url: 'https://www.facebook.com/ULSA.IT/' });
  });
});





