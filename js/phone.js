const loadPhone = async(searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    console.log(phones)
    // console.log(phone.phone_name)
    displayPhones(phones,isShowAll)
}

const displayPhones = (phones,isShowAll) =>{

    const phoneContainer = document.getElementById('phone-container');

    // clear phone container cards before adding new cards
    phoneContainer.textContent = ' ';

    //display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    //display only first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        //2 : create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card bg-gray-100 p-4  shadow-xl';

        //3 :set innerHTML
        phoneCard.innerHTML =`
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
                </div>
            </div>
            `
        //4 : append child
        phoneContainer.appendChild(phoneCard)
    })

    //hide loading spinner
    toggleLoadSpinner(false);
}

// handle search button
const handleSearch = (isShowAll) => {

    toggleLoadSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}


const toggleLoadSpinner =(isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}


const handleShowDetails = async (id) => {
    // console.log('clicked show details', id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone)

}

const showPhoneDetails = (phone) =>{
    console.log(phone);

    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <h1>Brand : <span>${phone.brand}</span></h1>
    <img class="rounded-md bg-slate-800" src = "${phone.image}" alt=""/>
    <p class="mt-2"><span>Storage : </span>${phone?.mainFeatures?.storage}</p>
    <p class="">ChipSet : <span>${phone.mainFeatures.chipSet}</span></p>
    <p class="">displaySize : <span>${phone.mainFeatures.displaySize}</span></p>
    <p class="">sensors : <span>${phone.mainFeatures.sensors}</span></p>
    <li><span>${phone.mainFeatures.sensors[0]}</li>
    <li><span>${phone.mainFeatures.sensors[1]}</li>
    <li><span>${phone.mainFeatures.sensors[2]}</li>
    <li><span>${phone.mainFeatures.sensors[3]}</li>
    <li><span>${phone.mainFeatures.sensors[4]}</li>
    <li><span>${phone.mainFeatures.sensors[5]}</li>
    <p class="">releaseDate: <span>${phone.releaseDate}</span></p>
    <p class="">ChipSet : <span>${phone.mainFeatures.chipSet}</span></p>
    <p class="">ChipSet : <span>${phone.mainFeatures.chipSet}</span></p>
    <p ></p>
    `
    //show the modal
    show_details_modal.showModal();
}



const handleShowAll = () => {
    handleSearch(true)
}




loadPhone();


//  ; show_details_modal.showModal()

/*
brand
: 
"Apple"
image
: 
"https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro.jpg"
mainFeatures
: 
chipSet
: 
"Apple A15 Bionic (5 nm)"
displaySize
: 
"6.1 inches, 90.2 cm2 (~86.0% screen-to-body ratio)"
memory
: 
"128GB 6GB RAM, 256GB 6GB RAM, 512GB 6GB RAM, 1TB 6GB RAM"
sensors
: 
(6) ['Face ID', 'accelerometer', 'gyro', 'proximity', 'compass', 'barometer']
storage
: 
"128GB/256GB/1TB storage, no card slot"
[[Prototype]]
: 
Object
name
: 
"iPhone 13 Pro"
others
: 
{WLAN: 'Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot', Bluetooth: '5.0, A2DP, LE', GPS: 'Yes, with A-GPS, GLONASS, GALILEO, BDS, QZSS', NFC: 'Yes', Radio: 'No', …}
releaseDate
: 
""
slug
: 
"apple_iphone_13_pro-11102"
[[Prototype]]
: 
Object*/