// JQUERY MAIN METHOD
$(() => {
  editCampaignModal();
  createCampaignModal();
});

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
    $(".createCampaign #createCampaignSumbitBtn").text("Create");
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
