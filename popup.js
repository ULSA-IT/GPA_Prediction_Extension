function getActiveTab(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    callback(tabs);
  });
}
window.onload = () => {
  const toggleBtn = document.querySelector("#togBtn");
  const switchBtn = document.querySelector(".switch");
  const switchInp = switchBtn.querySelector("input");
  const warningText = document.querySelector(".warning");

  function handleToggle(value) {
    getActiveTab(function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          message: "toggle",
          value: value,
        },
        function (response) {}
      );
    });
  }

  function syncToggle() {
    getActiveTab(function (tabs) {
      const tab = tabs[0];
      console.log(tab);

      if (tab.url && tab.url.startsWith("http://sinhvien.ulsa.edu.vn/KetQuaHocTap.aspx")) {
        switchBtn.style.display = "block";
        warningText.style.display = "none";

        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            message: "syncToggle",
          },
          function (response) {
            let value = response.value === "true";
            switchInp.checked = value;
          }
        );
      } else {
        switchBtn.style.display = "none";
        warningText.style.display = "block";
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





