// VARIABLES
var password;
var btnIn;
var username;
var list = [];
var cartList = [];
var exist = false;
var errUser;
var errPass;
var userCart;


// ON LOAD
window.addEventListener("DOMContentLoaded", init);

function init() {
    btnIn = document.getElementById('btnIn');
    password = document.getElementById('password');
    username = document.getElementById('username');
    errUser = document.getElementById('errUser');
    errPass = document.getElementById('errPass');
    userCart = document.getElementById('cart');

    eventHandler();
}

// Event HANDLER
function eventHandler() {
    btnIn.addEventListener('click', function () {
        // RICHIAMO VALIDATION
        validation();
    });
}

// FUNCTION VALIDATION
function validation() {
    // RICHIAMO EXISTENCE
    existence();
}

// FUNCTION EXISTENCE USERNAME AND EMAIL
async function existence() {
    let response = await fetch("http://localhost:3000/users")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            list = data;
            errUser.innerHTML = "";

            list.forEach(user => {
                if ((user.email == username.value || user.user == username.value) && user.password == password.value) {
                    exist = true;
                }
            });

            if (exist) {
                errUser.innerHTML = "";
                errUser.innerHTML = "This user exists!";
            } else {
                errUser.innerHTML = "";
                errUser.innerHTML = "Username/email or password don't match.";
            };

            exist = false;
        }).then((data) => {
            // CREATE LOCALSTORAGE DATA
            localStorage.setItem("user", username.value);

            if (localStorage.getItem("user")) {
                // UTENTE E' LOGGATO. Quindi ha il suo carrello
                getCart(2);
            }
        });



    // LOGOUT, DOPO
    // localStorage.removeItem("user");

    // RICHIAMO ADD DATA
    // addData(data);
}

// FUNCTION ADD DATA FOR PUSHING IN THE JSON

async function addData(data) {
    let response = await fetch('http://localhost:3000/users',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(data),
        }
    ).then(() => {
        localStorage.setItem("user", username.value);
    })
}


// GET USER'S CART

async function getCart(id) {
    let response = await fetch("http://localhost:3000/cart")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            cartList = data;

            cartList.forEach(cart => {
                if (cart.idUser == id) {
                    // RITORNAMI I PRODOTTI DENTRO AD ARTICLES DEL CARRELLO

                    let content = cart.articles;

                    userCart.innerHTML += `
                        <li>
                            ${cart.articles}
                        </li>
                        `
                }
            });

            // if (exist) {
            //     errUser.innerHTML = "";
            //     errUser.innerHTML = "This user exists!";
            // } else {
            //     errUser.innerHTML = "";
            //     errUser.innerHTML = "Username/email or password don't match.";
            // };

            // exist = false;
        });
};