var productTitle;
var productImg;
var productDetail;
var url = window.location.href;

window.addEventListener("DOMContentLoaded", init);

function init() {

    productTitle = document.getElementById('product-title');
    productImg = document.getElementById('product-img');
    productDetail = document.getElementById('product-detail');
    
    printDetail();
}

function printDetail() {
    var currentId = Number(url.slice((url.indexOf('=') + 1), url.length)) ;
    
    fetch("http://localhost:3000/articles/" + currentId)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
                    productTitle.innerHTML = `${data.title}`;
                    productImg.innerHTML = `<img src="${data.image}" alt="product image">`;
                    productDetail.innerHTML = `${data.description}`;
                });
        }