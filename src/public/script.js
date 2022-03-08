const formElement = document.getElementById("saveLogin");

formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    let user = document.getElementById('user').value;
    let password = document.getElementById('password').value;

    let transaction = {
        user: user,
        password: password
    };

    let transactionJson = JSON.stringify(transaction);

    // MANDAR LOS DATOS DEL BACKEND Y GUARDARLOS AHI
    console.log(transaction);
    console.log(transactionJson);

    fetch('https://www.delilah-resto.ga/api/login', {
        method : 'POST',
        body   : transactionJson
    })
    .then(response => response.json())
    .then(data => console.log(data));
})