var productTitle;
var productImg;
var productPrice;
var productDetail;
var url = window.location.href;
var currentId;

window.addEventListener("DOMContentLoaded", init);

function init() {

    productTitle = document.getElementById('product-title');
    productImg = document.getElementById('product-img');
    productPrice = document.getElementById('product-price');
    productDetail = document.getElementById('product-detail');
    addToCart = document.getElementById('addToCart');
    buyNow = document.getElementById('buyNow');

    eventHandlerDetail();
}

// Event HANDLER
function eventHandlerDetail() {
    printDetail();
}

function printDetail() {
    currentId = Number(url.slice((url.indexOf('=') + 1), url.length));

    fetch("http://localhost:3000/articles/" + currentId)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            productTitle.innerHTML = `${data.title}`;
            productImg.innerHTML = `<img src="${data.image}" class="img-fluid" alt="product image">`;
            productPrice.innerHTML = `${data.price}&euro;`;
            productDetail.innerHTML = `${data.description}`;
        });
}

// PUT
// async function addProduct() {

//     let array = [];
//     // let obj = {
//     //     idUser: userId,
//     //     articles: array.push(currentId)
//     // }


//     let userIdentifier = Number(localStorage.getItem("userId"));
//     let cartId = localStorage.getItem("cartId");

//     let response = await fetch('http://localhost:3000/cart/' + cartId,
//         {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json;charset=utf-8' },
//             body: JSON.stringify({
//                 idUser: userIdentifier,
//                 articles: array.push(currentId)
//             })
//         }
//     )
// }