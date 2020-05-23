// CLOSE FLASH MESSAGES
function closeFlash() {
  var selector = "body #messages";
  if (!$(selector).children().hasClass("stubborn")) {
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

// GENERATE ALERT BOXES
function genAlertBox(type, msg) {
  var html = `<div id="messages">
    <ul class="${type}">
      <li>${msg}</li>
    </ul>
  </div>`;

  $("body").prepend(html);
}

// CLEAR EVERY MODAL INPUT
function clearAllInput() {
  // When "Close" button is clicked in any modal, all input should get EMPTY.
  $(`[data-dismiss="modal"]`).click(() => {
    $(".modal input").val("");
    $(".modal textarea").val("");
    $(".modal select").val("");
  });
}
// clearAllInput();

// CREATE CAMPAIGN MODAL
function createCampaignModal() {
  let createCampaignBtn = $(".createCampaignBtn");

  // At click event, do the following.
  createCampaignBtn.click(() => {
    // Empty all inputs
    $(".createCampaign input").val("");

    // Change Modal Title
    $(".createCampaign #createCampaignTitle").text("Create Campaign");

    // Change "modalAlert" content
    $(".createCampaign #modalAlert").html(
      `You're about to create a crowdfunding fund campaign,
      remember you are to grow the campaign to 20,000 GC before it can be
      <span class="text-success">published</span>.`
    );

    // Change Modal Buttons
    $(".createCampaign #createCampaignSumbitBtn").text("Create Campaign");
    $(".createCampaign #deleteCampaignBtn").addClass("hide");

    // Change Modal Form Action
    $(".createCampaign #createCampaignForm").attr(
      "action",
      "/campaigns/create"
    );
  });

  // Selection of Category
  $(".createCampaign select#category").on("input", () => {
    var category = document.querySelector("#category");
    var subCategory = $("#subCategory");

    // All Category Array
    const categoriesArr = [
      {
        mainCat: "BUSINESS",
        subCat: [
          "Business Capital",
          "Business Expansion Fund",
          "Manufacturing Equipment",
        ],
      },
      {
        mainCat: "CHARITY",
        subCat: [
          "Motherless Baby Home",
          "Old Peoples Home",
          "Orphanage Home",
          "Physically Challenged",
        ],
      },
      {
        mainCat: "DISASTER",
        subCat: ["Earthquake", "Fire", "Flood", "Volcanic Eruptions", "War"],
      },
      {
        mainCat: "EDUCATION",
        subCat: [
          "Books/E-books",
          "Degree Program",
          "Information Technology Program",
          "Scholarship",
          "Tuition Fee",
        ],
      },
      { mainCat: "EMERGENCY", subCat: ["Emergency"] },
      {
        mainCat: "ENTERTAINMENT",
        subCat: [
          "Anniversary",
          "Award",
          "Baby Naming",
          "Birthday",
          "Burial",
          "Wedding",
        ],
      },
      {
        mainCat: "HEALTH",
        subCat: [
          "Drugs",
          "Food",
          "Hospital Bill",
          "Lab Test",
          "Red Cross",
          "Scan",
        ],
      },
      {
        mainCat: "PROJECT",
        subCat: [
          "Building Project",
          "Community Project",
          "Medical Research",
          "School Project",
          "Technological Research",
        ],
      },
      {
        mainCat: "PROPERTY",
        subCat: [
          "Car",
          "Cloth",
          "Electronics",
          "House",
          "Land",
          "Shoes",
          "Upholstery",
        ],
      },
      {
        mainCat: "RENT",
        subCat: [
          "Rent Car",
          "Rent Equipment",
          "Rent Hall",
          "Rent Home",
          "Rent Hotel",
          "Rent Office",
          "Rent Shop",
        ],
      },
      {
        mainCat: "REPAIR",
        subCat: [
          "Repair Apartment",
          "Repair Electronics",
          "Repair Generator",
          "Repair Machine",
          "Repair Motorbike",
          "Repair Vehicle",
        ],
      },
      {
        mainCat: "SPORTS",
        subCat: [
          "American Football",
          "Baseball",
          "Basketball",
          "Bike Race",
          "Boxing",
          "Car Race",
          "Cricket",
          "Football",
          "Handball",
          "Ice Hockey",
          "Lawn Tennis",
          "Rugby",
          "Swimming",
          "Table Tennis",
          "Track & Field",
          "Volleyball",
        ],
      },
      {
        mainCat: "TRAVEL",
        subCat: [
          "Flight",
          "Freight",
          "International Passport",
          "Rail",
          "Road",
          "Visa",
        ],
      },
      { mainCat: "OTHERS", subCat: ["Others"] },
    ];

    for (const child of category.children) {
      if (category.value === child.value) {
        categoriesArr.forEach((Cat) => {
          if (Cat.mainCat === category.value) {
            subCategory.html(""); // Empty subCategory

            // Append "Select a Sub Category" option before any other options
            subCategory.append(
              `<option value="">Select a Sub Category</option>`
            );

            // Looping through to append "subCat" strings to subCategory options
            Cat.subCat.forEach((subCats) => {
              subCategory.append(
                `<option value="${subCats}">${subCats}</option>`
              );
            });
          }
          if (category.value === "") {
            subCategory.html(""); // Empty subCategory

            // Append "Select a Sub Category" option before any other options
            subCategory.append(
              `<option value="">Select a Sub Category</option>`
            );
          }
        });
      }
    }
  });
}
editCampaignModal();

// EDIT CAMPAIGN MODAL
function editCampaignModal() {
  let editCampaignBtn = $(".editCampaignBtn");

  // At click event, do the following.
  editCampaignBtn.click(() => {
    // Empty all inputs
    $(".createCampaign input").val("");

    // Change Modal Title
    $(".createCampaign #createCampaignTitle").text("Edit Campaign");

    // Change "modalAlert" content
    $(".createCampaign #modalAlert").html(
      `Remember, when this campaign is 
      <span class="text-success">published</span>, 
      you can't edit it!`
    );

    // Change Modal Buttons
    $(".createCampaign #createCampaignSumbitBtn").text("Save Changes");
    $(".createCampaign #deleteCampaignBtn").removeClass("hide");

    // Change Modal Form Action
    $(".createCampaign #createCampaignForm").attr(
      "action",
      `/campaigns/edit/${window.user.id}`
    );
  });
}
createCampaignModal();

// GET USER'S COUNTRY
function setSelect(selector) {
  var select = document.querySelectorAll(selector);
  if (select.length) {
    var options = document.querySelectorAll(`${selector} > option`);
    var selectvalue = select[0].dataset.selectvalue;
    var optionvalue = "";

    options.forEach((option) => {
      optionvalue = option.value.toLowerCase();
      if (optionvalue == selectvalue) {
        option.setAttribute("selected", "selected");
        select.value = selectvalue;
      }
    });
  }
}
setSelect("#country");
setSelect("#next_country");

// CLEAR HISTORY WHEN LOGGED OUT
function clearHistoryOnLogout(url) {
  history.state = {};
  sessionStorage.clear();
  window.location.replace(url);
}

// PREVIEW AVATAR WJILE UPLOADING
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

// COUNTDOWN TIMER
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

// DROPZONE PHOTOS UPLOAD
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
