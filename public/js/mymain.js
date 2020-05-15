function closeFlash(selector) {
  if (!$(selector).children().hasClass("stubborn")) {
    if ($(selector).children().hasClass("error"))
      setTimeout(() => {
        $(selector).hide();
        $(selector).html("");
      }, 3000);

    if (!$(selector).children().hasClass("error"))
      setTimeout(() => {
        $(selector).hide();
        $(selector).html("");
      }, 1500);
  }

  $("#messages").click((e) => {
    $(selector).hide();
    $(selector).html("");
  });
}
closeFlash("#messages");

function getUserCountry() {
  var select = document.querySelectorAll("#country");
  var options = document.querySelectorAll("#country > option");
  options.forEach((option) => {
    var optionValue = option.value.toLowerCase();
    var country = document.getElementById("real_country").innerText;
    if (optionValue == country) {
      option.setAttribute("selected", "selected");
      select.value = country;
    }
  });
}
getUserCountry();

function getNextCountry() {
  var select = document.querySelectorAll("#next_country");
  var options = document.querySelectorAll("#next_country > option");
  options.forEach((option) => {
    var optionValue = option.value.toLowerCase();
    var country = document.getElementById("real_next_country").innerText;
    if (optionValue == country) {
      option.setAttribute("selected", "selected");
      select.value = country;
    }
  });
}
getNextCountry();

function clearHistoryOnLogout(url) {
  history.state = {};
  sessionStorage.clear();
  window.location.replace(url);
}

function previewAvatar() {
  $("#avatar").change((e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      var img = $("#avatar_img");
      img.css("background-image", `url(${e.target.result})`);
    };
  });
}
previewAvatar();
