// inizializziamo variabili

var cards;
var list = [];
var url = window.location.href;

window.addEventListener("DOMContentLoaded", init);

function init() {
    cards = document.getElementById("productCards");
    printData();
}

function printData() {
    fetch("http://localhost:3000/articles")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            list = data;
            if (list.length > 0) {
                cards.innerHTML = '';
                list.map(function (element) {
                    cards.innerHTML += `
                    <div class="card border border-white align-content-between" onclick="location.href='detail.html?id=${element.id}'">
                        <div class="text-center"><img src="${element.image}" class="card-img-top px-3 pt-3"></div>
                        <div class="card-body text-center d-flex flex-column justify-content-end cardText">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="fs-5">${element.price}&euro;</p>
                        </div>
                    </div>`
                });
            }
        });
}