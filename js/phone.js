const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    displayPhones(data.data);
}
const displayPhones = (phones) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
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
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
        `
        cardContainer.appendChild(phoneCard)
    });

}
const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    searchField.value = '';
    loadPhone(searchValue);
}


