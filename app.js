const elCatagory = document.querySelector(".catagory");
const elProduct = document.querySelector(".product");
const elLocal = document.querySelector(".local")
const elAllbtn = document.querySelector(".addbtn")

const baseUrl = "https://data-lesson-13.vercel.app/phones";

async function getData() {
  try {
    const res = await fetch(`${baseUrl}`);
    const data = await res.json();
    render(data);
  } catch (error) {
    console.log(error);
  }
}
function render(data) {
  elProduct.innerHTML = data
    .map((item) => {
      return `
    <div data-item=${item.id} class="bg-fuchsia-400 rounded-lg overflow-hidden  ">
<div data-item=${item.id} class="w-full ">
<img src="${item.img}" data-item=${item.id} class="w-full" alt="">
    
</div>
    <div class="flex flex-col gap-4 px-4 py-4 font-bold" data-item=${item.id}>
    <h1 data-item=${item.id} >${item.title}</h1>
    <h1 data-item=${item.id} >${item.brand}</h1>
    </div>
    </div>
    `;
    })
    .join("");
}
getData();

elProduct.addEventListener("click", async (e) => {
  const id = e.target.dataset.item;
  if (id) {
    try {
      const res = await fetch(`${baseUrl}/${id}`);
      const data = await res.json();
      console.log(data);
      renderModal(data);
    } catch (err) {
      console.log(err.message);
    }
  }
});

function renderModal(item) {
  elCatagory.innerHTML = `
            <div class="w-full h-screen flex justify-center top-0 left-0 items-center fixed z-40 bg-[rgba(0,0,0,0.4)]">
                <div class="w-[300px] bg-white rounded-md overflow-hidden">
                <div>
                <div class="w-full ">
                <img src="${item.img}" data-item=${item.id} class="w-full" alt="">
                </div>
                    <div class="flex flex-col  bg-gray-300 gap-4 p-4" data-item=${item.id}>
                    <h1 class="text-4xl font-bold text-gray-600" >${item.title}</h1>
                    <h1 class="text-3xl font-bold text-red-400" >${item.brand}</h1>
                    <h1 class="text-2xl font-bold text-gray-400" >${item.rame}</h1>
                    <h1 class="text-2xl font-bold text-gray-800" >${item.color}</h1>
                    <h1 class="text-4xl font-bold text-gray-600" >${item.price}</h1>
                    <button  class="btn py-1 px-3 bg-blue-500 rounded-md text-white font-bold">ADD</button>
                    </div>
                    </div>
                </div>
            </div>
            `;
            const btn = document.querySelector(".btn")
            btn.addEventListener("click",()=>{
                saveLocal(item)
            })
}

function saveLocal(data) {
    console.log(data);
    const oldData = JSON.parse(localStorage.getItem("data")) || []
    localStorage.setItem("data",JSON.stringify([data, ...oldData]))
}

window.addEventListener("click", (e) => {
  e.preventDefault();
  elCatagory.innerHTML = "";
});



function AddLocalData() {
    console.log("salom");
    elLocal.classList.toggle("translate-x-[12.5%]")
    const data = JSON.parse(localStorage.getItem("data"))
    elLocal.innerHTML = data.map((item)=>{
        return `
        <div data-item=${item.id} class="bg-fuchsia-400 rounded-lg overflow-hidden  ">
<div data-item=${item.id} class="w-full ">
<img src="${item.img}" data-item=${item.id} class="w-full" alt="">
    
</div>
    <div class="flex flex-col gap-4 px-4 py-4 font-bold" data-item=${item.id}>
    <h1 data-item=${item.id} >${item.title}</h1>
    <h1 data-item=${item.id} >${item.brand}</h1>
    </div>
    </div>
    `
    }).join("")
}

elAllbtn.addEventListener("click",AddLocalData)