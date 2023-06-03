const form = document.getElementById('createNewProductFrom');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    let newProduct = {}
    for (const [key, value] of formData.entries()) {
        if (key === "stock" || key === "price") {
            newProduct = {
                ...newProduct,
                [key]: Number(value)
            }
        } else if (key === "status") {
            if (value === "on") {
                newProduct = {
                    ...newProduct,
                    [key]: true
                }
            } else {
                newProduct = {
                    ...newProduct,
                    [key]: false
                }
            }
        } else if (key === "thumbnail") {
            newProduct = {
                ...newProduct,
                [key]: [value]
            }
        } else {
            newProduct = {
                ...newProduct,
                [key]: value
            }
        }
    }
    console.log(newProduct)
    productsContainer.innerHTML = ``
    socket.emit("addProduct", newProduct)
});

const socket = io();

const messageParagrahp = document.getElementById("messageParagrahp")
const productsContainer = document.getElementById("productsContainer")
socket.on("getProducts", (data) => {
    console.log(data)
    messageParagrahp.innerHTML = data.message || ""
    productsContainer.innerHTML = ``
    data.products.forEach(p => {
        productsContainer.innerHTML += `
                <div class="productCard">
                    <h3>${p.title}</h3>
                    <p>
                        ${p.description}
                    </p>
                    <p>
                        $ ${p.price}
                    </p>
                    <a href="/products/${p.id}"><button class="productDetailButton">VER DETALLE</button></a>
                </div>
        `
    });
})