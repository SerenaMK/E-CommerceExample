// inizializziamo variabili

var cards;
var list = [];
var url = window.location.href;

window.addEventListener("DOMContentLoaded", init);

function init() {
    cards = document.getElementById("cards");
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
                    cards.innerHTML += `<div class="card" onclick="location.href='detail.html?id=${element.id}'">
                    <img src="${element.image}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                    </div>
                </div>`
                });
            }
        });
}




