function closeFlash() {
  var selector = "body #messages";
  if ($(selector).children().hasClass("stubborn")) {
    if ($(selector).children().hasClass("error"))
      setInterval(() => {
        $(selector).hide();
        $(selector).html("");
      }, 3000);

    if (!$(selector).children().hasClass("error"))
      setInterval(() => {
        $(selector).hide();
        $(selector).html("");
      }, 1500);
  }

  $("body").click((e) => {
    $(selector).hide();
    $(selector).html("");
  });
}
closeFlash();

function genAlertBox(type, msg) {
  var html = `<div id="messages">
    <ul class="${type}">
      <li>${msg}</li>
    </ul>
  </div>`;

  $("body").prepend(html);
}

function clearAllInput() {
  // When "Close" button is clicked in any modal, all input should get EMPTY.
  $(`[data-dismiss="modal"]`).click(() => {
    $(".modal input").val("");
    $(".modal textarea").val("");
    $(".modal select").val("");
  });
}
// clearAllInput();

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

function countdowntimer(selector) {
  var countdownId = document.getElementById(selector);
  if (countdownId != null) {
    var countDownDate = countdownId.innerText;
    // var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

    // Update the count down every 1 second
    var x = setInterval(() => {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id=countdownId
      countdownId.innerHTML =
        days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        countdownId.innerHTML = "EXPIRED";
      }
    }, 1000);
  }
}
countdowntimer("countdown");

function dropzoneCon() {
  const setParamName = () => {
    return "photo";
  };

  const submitPhotos = (_this) => {
    $("#createCampaignForm").submit((e) => {
      e.preventDefault();
      e.stopPropagation();
      _this.processQueue();
    });
  };

  Dropzone.options.campaignPhotosForm = {
    url: "/campaigns/create",
    uploadMultiple: true,
    paramName: setParamName, // The name that will be used to transfer the file
    maxFiles: 3, // Number of photos
    maxFilesize: 2, // MB
    parallelUploads: 3, // Number of uploads at once
    addRemoveLinks: true,
    autoProcessQueue: false,
    acceptedFiles: "image/*",
    init: function () {
      this.on("error", (file, errorMessage, xhr) => {
        if (!xhr) this.removeFile(file);
      });

      this.on("errormultiple", (file, errorMessage, xhr) => {
        if (xhr) genAlertBox("error", "Please! Fill up all fields properly.");
      });

      this.on("addedfile", (file) => {
        if (this.files.length >= 3) {
          $("#createCampaignSumbitBtn").removeAttr("disabled");
        } else $("#createCampaignSumbitBtn").attr("disabled", "disabled");
      });

      this.on("removedfile", (file) => {
        if (this.files.length >= 3) {
          $("#createCampaignSumbitBtn").removeAttr("disabled");
        } else $("#createCampaignSumbitBtn").attr("disabled", "disabled");
      });

      this.on("sendingmultiple", (file, xhr, formData) => {
        // Append all form inputs to the formData Dropzone will POST
        var data = $("#createCampaignForm").serializeArray();
        $.each(data, (key, el) => {
          formData.append(el.name, el.value);
        });
      });

      submitPhotos(this);

      this.on("successmultiple", (file, response) => {
        genAlertBox(response.status, `${response.msg}`);
        setTimeout(() => {
          location.replace(response.url);
        }, 2000);
      });
    },
  };
}
dropzoneCon();
