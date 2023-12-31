const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    displayPhones(data.data, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    const showAllBtn = document.getElementById('btn-show-all');
    if (phones.length > 12 && !isShowAll) {
        showAllBtn.classList.remove('hidden')
    } else {
        showAllBtn.classList.add('hidden')
    }
    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }
    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card min-w-96 bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
                        <img src="${phone.image}" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${phone.brand}</h2>
                        <p>${phone.phone_name}</p>
                        <div class="card-actions">
                            <button onclick="handleShowDetail('${phone.slug}');showModal.showModal()" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
        `
        cardContainer.appendChild(phoneCard)
    });
    loadingSpinner(false);

}
const handleSearch = (isShowAll) => {
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    // searchField.value = '';
    loadPhone(searchValue, isShowAll);
    loadingSpinner(true);
}

const loadingSpinner = (isLoading) => {
    const spinner = document.getElementById('loading-spinner');
    if (isLoading) {
        spinner.classList.remove('hidden')
    } else {
        spinner.classList.add('hidden')
    }
}
const handleShowAll = () => {
    handleSearch(true);
}
const handleShowDetail = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data.data);
    displayModal(data.data)
}

const displayModal = (phone) => {
    const modalInfo = document.getElementById('modal-info');

    modalInfo.innerHTML = `
                        <figure class="px-10 pt-10 flex justify-center">
                            <img src="${phone.image}" class="rounded-xl" />
                        </figure>
                        <h3 class="font-bold text-lg">${phone.brand}</h3>
                        <p class="py-4">Press ESC key or click the button below to close</p>
    `

}
