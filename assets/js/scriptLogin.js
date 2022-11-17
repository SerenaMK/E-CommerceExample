// VARIABLES
var password;
var btnIn;
var username;
var listLogin = [];
var exist = false;
var errUser;
var errPass;
var currentId;
var idUser;
var cartId;

// ON LOAD
window.addEventListener("DOMContentLoaded", initLogin);

function initLogin() {
    btnIn = document.getElementById('btnIn');
    password = document.getElementById('password');
    username = document.getElementById('username');
    errUser = document.getElementById('errUser');
    errPass = document.getElementById('errPass');
    userCart = document.getElementById('cart');
    idUser = localStorage.getItem("userId");

    eventHandlerLogin();
}

// Event HANDLER
function eventHandlerLogin() {
    btnIn.addEventListener('click', function () {
        // RICHIAMO VALIDATION
        validation();
    });

    if (idUser) {
        let navLogin = document.getElementById("navLogin");
        let navLogout = document.getElementById("navLogout");

        navLogin.classList.remove("d-block");
        navLogin.classList.add("d-none");
        navLogout.classList.remove("d-none");
        navLogout.classList.add("d-block");
    } else {
        
    };
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
            listLogin = data;
            errUser.innerHTML = "";

            listLogin.forEach(user => {
                if ((user.email == username.value || user.user == username.value) && user.password == password.value) {
                    exist = true;
                    currentId = user.id;
                }
            });

            if (exist) {
                errUser.innerHTML = "";
                errUser.innerHTML = "Logged in!";
            } else {
                errUser.innerHTML = "";
                errUser.innerHTML = "Username/email or password don't match.";
            };

            exist = false;

            // CREATE LOCALSTORAGE DATA
            localStorage.setItem("user", username.value);
            localStorage.setItem("userId", currentId);

            getCart2();
        })
    // .then(() => {

    //     if (idUser) {
    //         document.getElementById("navLogin").innerHTML = "Log Out";
    //     };
    // });

    // LOGOUT, DOPO
    // localStorage.removeItem("user");
}

// GET USER'S CART
async function getCart2() {
    let response = await fetch("http://localhost:3000/cart")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            cartList = data;
            // idUser = localStorage.getItem("userId");

            cartList.forEach(cart => {
                if (cart.idUser == idUser) {
                    // RITORNAMI I PRODOTTI DENTRO AD ARTICLES DEL CARRELLO
                    cartId = cart.id;
                    localStorage.setItem("cartId", cartId);
                }
            });
        });
};