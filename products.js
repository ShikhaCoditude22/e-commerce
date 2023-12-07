let itemsel = document.querySelector(".elements")
let cartsel = document.querySelector(".cartitems")
let subtotalsel = document.querySelector(".subtotal")
let totalsel = document.querySelector(".btn-white span")
let items = [
    {
        id: 1,
        image: "coffee-asorted-300x300",
        Category: "Groceries",
        Name: "Assorted Coffee",
        Price: 35.00,
        stock: 10,
        qty: 0

    },
    {
        id: 2,
        image: "cashew-butter-500",
        Category: "Groceries",
        Name: "Cashew Butter",
        Price: 25.00,
        stock: 15,
        qty: 0
    },
    {
        id: 3,
        image: "diabetic-cookies-400x400",
        Category: "Groceries",
        Name: "Diabetic Cookies",
        Price: 25.00,
        stock: 8,
        qty: 0
    },
    {
        id: 4,
        image: "eggs-400x400",
        Category: "juice",
        Name: "Eggs",
        Price: 34.00,
        stock: 11,
        qty: 0
    },
    {
        id: 5,
        image: "orage-juice-kariz-300x300",
        Category: "juice",
        Name: "fresh Orange juice",
        Price: 18.00,
        stock: 14,
        qty: 0
    },
    {
        id: 6,
        image: "organic-honey-400x400",
        Category: "Groceries",
        Name: "fresh Organic Honey",
        Price: 34.00,
        stock: 12,
        qty: 0
    },
    {
        id: 7,
        image: "sanitizer-300x300",
        Category: "Groceries",
        Name: "Hand Senitizer",
        Price: 15.00,
        stock: 13,
        qty: 0
    },
    {
        id: 8,
        image: "red-chillies-300x300",
        Category: "Groceries",
        Name: "Handpicked Red chilies",
        Price: 19.00,
        stock: 19,
        qty: 0
    },
    {

        id: 9,
        image: "edible-oil-300x300",
        Category: "Groceries",
        Name: "Natural Extrected Edible Oil",
        Price: 25.00,
        stock: 18,
        qty: 0
    }
]


function displayitems() {
    itemsel.innerHTML += items.map((prod, index) => {
        return (`
         <div class="col">
            <div class="card h-100 border-0 style="width:16rem; ">
              <img src="images/${prod.image}.jpg" class="card-img-top" alt="...">
                  <div class="card-body text-center">
              <h5 class="card-title text-muted">${prod.Category}</h5>
      <h5 class="card-title">${prod.Name}</h5>
      <p class="card-text">
        <i class="fa-solid fa-star"  ></i><i class="fa-solid fa-star" ></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star" ></i><i class="fa-solid fa-star" ></i>
      </p>
      <div class="d-flex">
      <h6 class="flex-grow-1 text-start mt-4">£${prod.Price}</h6>
      <button type="button" class="btn btn1 text-white btn-lg mt-3 bg-sucess" onclick="addtocart(${prod.id})">+<i class="fa-solid fa-cart-shopping"></i></button>
      </div>
    </div>
            </div>
          </div>
          ` )
    }
    )

}
displayitems()

let cart = JSON.parse(localStorage.getItem("CART")) || [];

updatecart();
function addtocart(id) {
    // check if product alredy exist
    if (cart.some((item) => item.id === id)) {
        changeqty("plus", id);

    }
    else {
        const item = items.find((product) => product.id === id);
        cart.push({
            ...item,
            qty: 1
        });

    }
    updatecart();


}
function updatecart() {
    rendercartitems();
    rendersubtotal();
    localStorage.setItem("CART", JSON.stringify(cart));
}
function rendercartitems() {
    cartsel.innerHTML = "";
    cart.forEach((item) => {
        cartsel.innerHTML +=
            `<table class"table w-100">
        <tbody>
        <tr><td><img src="images/${item.image}.jpg" height=50 width=50></td>
        <td><p style="font-size:13px;">${item.Name}</p></td>
        <td>$${item.Price}</td>
        <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-square" viewBox="0 0 16 16" onclick="changeqty('minus',${item.id})">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
      </svg>      ${item.qty}      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16" onclick="changeqty('plus',${item.id})">
      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg></td>
    <td><i class="fa-solid fa-trash text-primary" onclick="removeitem(${item.id})"></i>
    </td></tr></tbody></table>`
    });
}
function changeqty(action, id) {
    cart = cart.map((item) => {
        let qty = item.qty;
        if (item.id === id) {
            if (action === 'minus' && qty > 1) {
                qty--;
            }
            else if (action === 'plus' && qty < item.stock) {
                qty++
            }
        }
        return {
            ...item,
            qty,
        };
    })
    updatecart();
}
function rendersubtotal() {
    let totalprice = 0, totalitems = 0;
    cart.forEach((item) => {
        totalprice += item.Price * item.qty;
        totalitems += item.qty;

    });
    subtotalsel.innerHTML = `Subtotal(${totalitems} items):$${totalprice.toFixed(2)}`
    totalsel.innerHTML = totalitems;
}
function removeitem(id) {
    cart = cart.filter((item) => item.id !== id);
    updatecart();
}

