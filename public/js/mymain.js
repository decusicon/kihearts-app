// GLOBAL FUNCTIONS
function globalFunctions() {
	// Convert string into name like
	window.nameCase = (word) => {
		word = word.replace(word.charAt(0), word.charAt(0).toUpperCase());
		return word;
	};

	// Convert string into sentence like
	window.sentenceCase = (word) => {
		word = word.toLowerCase().trim();
		let result = "";
		if (word.includes(" ")) {
			let wordArr = [];
			let words = word.split(" ");
			words.forEach((word) => {
				wordArr.push(
					word.replace(word.charAt(0), word.charAt(0).toUpperCase())
				);
			});

			return (wordArr = wordArr.join(" "));
		}
		result = word.replace(word.charAt(0), word.charAt(0).toUpperCase());
		return result;
	};

	// Convert string into uppercase
	window.upperCase = (word) => {
		return word.toUpperCase();
	};

	// Convert string into lowercase
	window.lowerCase = (word) => {
		return word.toLowerCase().trim();
	};

	// Add 0 to account or phone number that are suppose to be 10 or 11 respectively
	window.addZero = (number, type) => {
		var numberStr = String(number);
		if (type == "phoneNumber") {
			if (numberStr.length == 10) {
				return `0${number}`;
			}
		}

		if (type == "accountNumber") {
			if (numberStr.length == 9) {
				return `0${number}`;
			}
		}

		return number;
	};
}
globalFunctions();

// CLOSE FLASH MESSAGES
function closeFlash() {
	var selector = "body #messages";
	if (!$(selector).children().hasClass("stubborn")) {
		if ($(selector).children().hasClass("error"))
			setTimeout(() => {
				$(selector).hide();
				$(selector).html("");
			}, 2000);

		if (!$(selector).children().hasClass("error"))
			setTimeout(() => {
				$(selector).hide();
				$(selector).html("");
			}, 1000);
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
	$(".modal input").val("").removeAttr("disabled");
	$(".modal textarea").val("").removeAttr("disabled");
	$(".modal select").val("").removeAttr("disabled");
}


//================ CAMPAIGN MODAL ====================//
// CREATE CAMPAIGN MODAL
function createCampaignModal() {
	var createCampaignBtn = $(".createCampaignBtn");

	// At click event, do the following.
	createCampaignBtn.click((e) => {
		// Clear every input
		clearAllInput();

		// Change Modal Title
		$(".createCampaign #createCampaignTitle").text("Create Campaign");

		// Change "modalAlert" content
		$(".createCampaign #modalAlert").html(
			`You're about to create a crowdfunding fund campaign,
      remember you are to grow the campaign to 20,000 GC before it can be
      <span class="text-success">published</span>.`
		);

		// Change Modal Buttons
		$(".createCampaign #createCampaignSubmitBtn").text("Create Campaign");
		$(".createCampaign #deleteCampaignBtn").addClass("hide");

		// Change Modal Form Action
		$(".createCampaign #createCampaignForm").attr(
			"action",
			"/campaigns/create"
		);

		// Add disabled attribute
		$("[form=createCampaignForm]").attr("disabled", "disabled");
	});

	const setSelectCategory = () => {
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
				subCat: [
					"Earthquake",
					"Fire",
					"Flood",
					"Volcanic Eruptions",
					"War",
				],
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
			{
				mainCat: "EMERGENCY",
				subCat: ["Emergency"],
			},
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
			{
				mainCat: "OTHERS",
				subCat: ["Others"],
			},
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
	};

	// Selection of Category
	$(".createCampaign select#category")
		.on("input", () => {
			setSelectCategory();
		})
		.on("click", () => {
			setSelectCategory();
		})
		.on("load", () => {
			setSelectCategory();
		});
}
createCampaignModal();

// EDIT CAMPAIGN MODAL
function editCampaignModal() {
	var editCampaignBtn = $(".editCampaignBtn");
	var deleteCampaignBtn = $("#deleteCampaignBtn");
	var campaignid = "";

	// At click event, do the following.
	editCampaignBtn.click((e) => {
		const {
			id,
			stage,
			title,
			reason,
			amount,
			category,
			subcategory,
		} = e.target.offsetParent.dataset;
		campaignid = id;

		// Clear every input
		clearAllInput();

		// Change Modal Title
		$(".createCampaign #createCampaignTitle").text("Edit Campaign");

		// Change "modalAlert" content
		$(".createCampaign #modalAlert").html(
			`Remember, when this campaign is 
      <span class="text-success">published</span>, 
      you can't edit it!`
		);

		// Set Modal Values
		if (stage == "active") {
			$(".createCampaign input#title").val(window.sentenceCase(title));
			$(".createCampaign textarea#reason").val(window.nameCase(reason));
			$(".createCampaign input#amount").val(amount);
			setSelect("#category", category);
			$("#subCategory").append(
				`<option value="${window.sentenceCase(
					subcategory
				)}">${window.sentenceCase(subcategory)}</option>`
			);
			setSelect("#subCategory", subcategory);
		}
		// Change Modal Buttons
		$(".createCampaign #createCampaignSubmitBtn").text("Save Changes");
		$(".createCampaign #deleteCampaignBtn").removeClass("hide");

		// Change Modal Form Action
		$(".createCampaign #createCampaignForm").attr(
			"action",
			`/campaigns/edit/${campaignid}`
		);

		// Remove disabled attribute
		$("[form=createCampaignForm]").removeAttr("disabled");
	});

	// Submit campaign via fetch
	// $("#createCampaignForm").submit((e) => {
	//   e.preventDefault()
	//   e.stopPropagation()

	//   var formData = new FormData()
	//   var data = $("#createCampaignForm").serializeArray()
	//   $.each(data, (key, el) => {
	//     formData.append(el.name, el.value)
	//   })

	//   fetch(e.target.action, { method: "POST", body: formData })
	//     .then((response) => response.json())
	//     .then((response) => {
	//       genAlertBox(response.type, `${response.msg}`)
	//       setTimeout(() => {
	//         location.replace(response.url)
	//       }, 1000)
	//     })
	//     .catch((response) => {
	//       console.log("ERROR RESPONSE: ", response)
	//     })
	// })

	// Delete a campaign
	deleteCampaignBtn.click((e) => {
		deleteCampaign(`/campaigns/edit/${campaignid}/delete`);
	});
}
editCampaignModal();

// DELETE CAMPAIGN
function deleteCampaign(url) {
	if (confirm("Are you sure you want to delete this campaign?")) {
		fetch(url, { method: "DELETE" })
			.then((response) => response.json())
			.then((response) => {
				genAlertBox(response.type, `${response.msg}`);
				setTimeout(() => {
					location.replace(response.url);
				}, 1000);
			})
			.catch((response) => {
				console.log("ERROR RESPONSE: ", response);
			});
	}
}
//================ CAMPAIGN MODAL ====================//


// // SET SELECT VALUE
function setSelect(selector, selectvalue = "") {
	var select = document.querySelectorAll(selector);
	if (select.length) {
		var options = document.querySelectorAll(`${selector} > option`);
		var optionvalue = "";
		selectvalue = select[0].dataset.selectvalue
			? select[0].dataset.selectvalue
			: selectvalue;

		options.forEach((option) => {
			optionvalue = option.value.toLowerCase();
			if (optionvalue == selectvalue) {
				option.setAttribute("selected", "selected");
				select.value = selectvalue;
			}
		});
	}
}
// setSelect("#country");
// setSelect("#next_country");
// setSelect("#bank");

// CLEAR HISTORY WHEN LOGGED OUT
function clearHistoryOnLogout(url) {
	history.state = {};
	sessionStorage.clear();
	location.replace(url);
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
			var minutes = Math.floor(
				(distance % (1000 * 60 * 60)) / (1000 * 60)
			);
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
			var dropzoneInstance = this;
			var editCampaignBtn = $(".editCampaignBtn");
			var createCampaignBtn = $(".createCampaignBtn");

			editCampaignBtn.click((e) => {
				dropzoneInstance.removeAllFiles(true);

				const { photos } = e.target.offsetParent.dataset;
				var photoUrls = photos.split(",");

				const photoName = (url) => url.split("/").pop().split("_")[0];

				// Populate any existing thumbnails
				if (photoUrls) {
					// Remove the "Remove file" link and disable the dropzone from adding more
					dropzoneInstance.options.addRemoveLinks = false;
					dropzoneInstance.options.clickable = false;

					const createThumbnail = (tempFile) => {
						dropzoneInstance.createThumbnailFromUrl(
							tempFile,
							dropzoneInstance.options.thumbnailWidth,
							dropzoneInstance.options.thumbnailHeight,
							dropzoneInstance.options.thumbnailMethod,
							true,
							(thumbnail) => {
								dropzoneInstance.emit(
									"thumbnail",
									tempFile,
									thumbnail
								);
								dropzoneInstance.emit("complete", tempFile);
							}
						);
					};

					for (var i = 0; i < photoUrls.length; i++) {
						const photoUrl = photoUrls[i];
						var tempFile = {
							name: photoName(photoUrl),
							size: 2000000,
							type: "image/jpeg",
							status: Dropzone.ADDED,
							accepted: true,
							dataURL: photoUrl,
						};

						dropzoneInstance.files.push(tempFile);
						dropzoneInstance.emit("addedfile", tempFile);
						createThumbnail(tempFile);
					}
				}
			});

			createCampaignBtn.click((e) => {
				dropzoneInstance.removeAllFiles(true);
			});

			dropzoneInstance.on("addedfile", (file) => {
				if (dropzoneInstance.files.length >= 3) {
					$("[form=createCampaignForm]").removeAttr("disabled");
				} else
					$("[form=createCampaignForm]").attr("disabled", "disabled");
			});

			dropzoneInstance.on("removedfile", (file) => {
				if (dropzoneInstance.files.length >= 3) {
					$("[form=createCampaignForm]").removeAttr("disabled");
				} else
					$("[form=createCampaignForm]").attr("disabled", "disabled");
			});

			dropzoneInstance.on("error", (file, errorMessage, xhr) => {
				if (!xhr) dropzoneInstance.removeFile(file);
			});

			dropzoneInstance.on("errormultiple", (file, errorMessage, xhr) => {
				if (xhr)
					genAlertBox(
						"error",
						"Please! Fill up all fields properly."
					);
			});

			dropzoneInstance.on("sendingmultiple", (file, xhr, formData) => {
				var data = $("#createCampaignForm").serializeArray();
				$.each(data, (key, el) => {
					formData.append(el.name, el.value);
				});
			});

			dropzoneInstance.on("successmultiple", (file, response) => {
				genAlertBox(response.type, `${response.msg}`);
				setTimeout(() => {
					location.replace(response.url);
				}, 1000);
			});

			submitPhotos(this);
		},
	};
}
dropzoneCon();

function referralFunctions() {
	const USER = null;
	const generateAndDisplayLink = () => {
		var referralLinkElems = document.querySelectorAll(
			"[data-referral-link]"
		);
		var referralLink = `${location.origin}/auth/register/?ref=${USER}`;
		if (referralLinkElems) {
			referralLinkElems.forEach((referralLinkElem) => {
				if (referralLinkElem.hasAttribute("data-copy-text")) {
					referralLinkElem.setAttribute(
						"data-copy-text",
						referralLink
					);
				} else {
					if (referralLinkElem.hasAttribute("href")) {
						referralLinkElem.setAttribute("href", referralLink);
						referralLinkElem.innerHTML = referralLink;
					}
					referralLinkElem.innerHTML = referralLink;
				}
			});
		}
	};

	const displayReferredUsers = () => {
		const referralsCon = $(".referrals .row");
		if (referralsCon) {
			const referredUserCard = (Obj) => `
        <li class="text-left col-12 text-truncate mb-3">
          <img class="img-profile rounded-circle" width="30" src="${
				Obj.avatar || "/resources/img/default_user.jpg"
			}"
            style="border: 1px solid #cccccc;">
          <span class="ml-2 small">${ClientScripts.globals().sentenceCase(
				Obj.fullname
			)}</span>
        </li>
      `;

			const getAllReferredUsers = () => {
				if (window.user.referrals) {
					var referrals = window.user.referrals;
					if (referrals.length > 0) {
						referralsCon.html("");
						referrals.forEach((ref) => {
							referralsCon.append(referredUserCard(ref));
						});
					}
				}
			};
			getAllReferredUsers();
		}
	};

	const mainMethod = () => {
		generateAndDisplayLink();
		// displayReferredUsers()
	};
	if (USER != undefined) mainMethod();
}
referralFunctions();

function copyToClipboard() {
	const copyText = (str, e) => {
		const el = document.createElement("textarea"); // Create a <textarea> element
		el.value = str; // Set its value to the string that you want copied
		el.setAttribute("readonly", ""); // Make it readonly to be tamper-proof
		el.style.position = "absolute";
		el.style.left = "-9999px"; // Move outside the screen to make it invisible
		document.body.appendChild(el); // Append the <textarea> element to the HTML document
		const selected =
			document.getSelection().rangeCount > 0 // Check if there is any content selected previously
				? document.getSelection().getRangeAt(0) // Store selection if found
				: false; // Mark as false to know no selection existed before
		el.select(); // Select the <textarea> content
		document.execCommand("copy"); // Copy - only works as a result of a user action (e.g. click events)
		document.body.removeChild(el); // Remove the <textarea> element
		if (selected) {
			// If a selection existed before copying
			document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
			document.getSelection().addRange(selected); // Restore the original selection
		}

		var originalText = e.currentTarget.innerHTML;
		e.currentTarget.innerHTML = "Copied!";
		setTimeout(() => {
			e.currentTarget.innerHTML = originalText;
		}, 1000);
	};

	$("[data-copy-text]").click((e) => {
		var textString = String(e.currentTarget.dataset.copyText).trim();
		copyText(textString, e);
	});
}
copyToClipboard();
