// content.js
if (window.location.href.startsWith("http://sinhvien.ulsa.edu.vn")) {
  //alert("Hello from content.js");
  alert("Hello from content.js");
}

var greeting = "hello, ";
var button = document.getElementById("mybutton");
button.person_name = "Bob";
button.addEventListener("click", () =>
  alert(greeting + button.person_name + ".")

);
