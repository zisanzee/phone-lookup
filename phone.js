const main = document.getElementById('main')
const modalDiv = document.getElementById('modal')
const searchValue = document.getElementById('search')
const showMore = document.createElement('button');
showMore.innerText = 'Show More...'
showMore.classList = `font-bold text-cyan-500 hover:scale-110 transition`

const loadPhone = async (value, showAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${value || 'iphone'}`)
  const data = await res.json();
  const phones = data.data;

  displayPhone(phones, showAll)
}
const displayPhone = (phones, showAll = false) => {
  main.innerHTML = '';
  // console.log(phones);
  if (!showAll) {
    phones = phones.slice(0, 10)
  } else {
    phones = phones;
  }


  phones.forEach(phone => {
    let card = document.createElement('div')
    card.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl">
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>${phone.brand}</p>
      <div class="card-actions justify-end">
        <button onclick="details('${phone.slug}')" class="btn bg-teal-600 text-white">details</button>
      </div>
    </div>
  </div>
    `
    main.appendChild(card);
    if (phones.length >= 10 && !showAll) {
      main.appendChild(showMore);
    }
  });
}
loadPhone()
const details = async (id) => {
  console.log(id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone = data.data
  console.log(phone.slug);
  modalDiv.innerHTML = `
  <dialog id="my_modal_1" class="modal max-h-fit">
      <form method="dialog" class="modal-box ">
      <img src="${phone.image}" class="mx-auto my-7" alt="">
        <h3 class="font-bold text-lg">${phone.name}</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque natus dolores dolor, perspiciatis tempore aliquam animi ex temporibus aliquid nisi.</p>
        <p><span class="font-semibold">storage:</span> ${phone.mainFeatures.storage}</p>
        <p><span class="font-semibold">Display Size:</span> ${phone.mainFeatures.displaySize}</p>
        <p><span class="font-semibold">Chipset:</span> ${phone.mainFeatures.chipSet}</p>
        <p><span class="font-semibold">Memory:</span> ${phone.mainFeatures.memory}</p>
        <p><span class="font-semibold">Release Date:</span> ${phone.releaseDate}</p>
        <p><span class="font-semibold">Sensors:</span> ${phone.mainFeatures.sensors.join(', ')}</p>
        <p><span class="font-semibold">Brand:</span> ${phone.brand}</p>
        <p><span class="font-semibold">GPS:</span> ${phone.others?.GPS || 'NO'}</p>
       
        <div class="modal-action">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn bg-red-600 text-white">Close</button>
        </div>
      </form>
    </dialog>
  `
  my_modal_1.showModal()
}
const search = (e, showAll) => {
  const value = searchValue.value;
  main.innerHTML = `<span class="loading loading-dots loading-lg h-screen w-1/12"></span>`;
  loadPhone(value, showAll)
}
showMore.addEventListener('click', () => {
  search(searchValue.value, true)
})



