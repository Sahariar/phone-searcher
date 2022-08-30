const loadPhoneData = async (phName, dataLimit) => {
	console.log(phName);
	const url = `https://openapi.programming-hero.com/api/phones?search=${phName}`;

	try {
		const res = await fetch(url);
		const data = await res.json();
		displayPhoneData(data.data, dataLimit);
	} catch (error) {
		console.log(error);
	}
};
const processData = (dataLimit) => {
	loadingSpiner(true);
	const inputFieldInfo = document.getElementById("search-field");
	const inputData = inputFieldInfo.value;
	loadPhoneData(inputData, dataLimit);
};

const displayPhoneData = (datas, dataLimit) => {
	const phoneWrapper = document.getElementById("phoneData");
	phoneWrapper.textContent = ``;
	// display only 16 data
	const notFoundMessage = document.getElementById("no-found-message");
	const showAllBtn = document.getElementById("show-all");
	if (datas.length === 0) {
		notFoundMessage.classList.remove("d-none");
	} else {
		notFoundMessage.classList.add("d-none");
	}
	if (dataLimit && datas.length > 12) {
		datas = datas.slice(0, 12);
		showAllBtn.classList.remove("d-none");
	} else {
		showAllBtn.classList.add("d-none");
	}

	datas.forEach((data) => {
		const cardDiv = document.createElement("div");
		cardDiv.classList.add("col");
		cardDiv.innerHTML = `
            <div class="card">
        <img src="${data.image}" class="card-img-top img-thumbnail w-75 mx-auto" alt="${data.phone_name}">
        <div class="card-body">
          <h5 class="card-title">${data.phone_name}</h5>
          <h5 class="card-title">${data.brand}</h5>

		  <a href="#" class="btn btn-primary" onclick="showDetails('${data.slug}')" data-bs-toggle="modal" data-bs-target="#detailsModal">Details</a>
        </div>
        </div>
        `;
		phoneWrapper.appendChild(cardDiv);
	});

	loadingSpiner(false);
};
const loadSearchData = () => {
	processData(10);
};

document.getElementById('search-field').addEventListener('keypress' , function (e) {
	console.log(e.key);

	if( e.key === "Enter"){
		processData(10);
	}
})

const loadingSpiner = (isSpining) => {
	const loaderElement = document.getElementById("loader");

	if (isSpining) {
		loaderElement.classList.remove("d-none");
	} else {
		loaderElement.classList.add("d-none");
	}
};

const showMore = () => {
	processData();
};

const showDetails = (slug) => {
	const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
	fetch(url).then(res => res.json()).then(data => displayPhoneDetails(data.data));
	
};


const displayPhoneDetails = (datas) => {
const displaydetailsWrapper = document.getElementById('displayDetails');

displaydetailsWrapper.innerHTML = `
	<div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${datas.name}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
		<p> 
		MainFeatures:
		</p>
		<p>${datas.mainFeatures.chipSet}</p>
		<p>${datas.mainFeatures.displaySize}</p>
		<p>${datas.mainFeatures.memory}</p>
		<p>${datas.mainFeatures.storage}</p>
		<p>${datas.mainFeatures.sensors}</p>

		<p> 
		Release Date: ${datas.releaseDate}
		</p>
      </div>
	
      <div class="modal-footer">
      </div>`


}