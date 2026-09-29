
/* =========================================
   LITTLE NEST KIDS - ADMIN PANEL
========================================= */


/* STORAGE */

const PRODUCT_KEY = "littleNestProducts";
const ORDER_KEY = "littleNestOrders";
const REVIEW_KEY = "littleNestReviews";


/* DEMO PRODUCTS */

const defaultProducts = [
    {
        id: 9,
        name: "Classic Newborn Set",
        category: "Newborn",
        group: "Newborn",
        gender: "Unisex",
        age: "0–3 Months",
        regularPrice: 1800,
        salePrice: 1499,
        price: 1499,
        old: 1800,
        stock: 12,
        colors: ["Cream"],
        sizes: ["0–1 Month", "1–3 Months"],
        tag: "NEW",
        photo: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80",
        description: "Soft and comfortable newborn clothing set."
    },

    {
        id: 10,
        name: "Soft Baby Pink Dress",
        category: "3–6 Months",
        group: "Baby",
        gender: "Girls",
        age: "3–6 Months",
        regularPrice: 2200,
        salePrice: 1899,
        price: 1899,
        old: 2200,
        stock: 15,
        colors: ["Pink"],
        sizes: ["3–6 Months"],
        tag: "NEW",
        photo: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=600&q=80",
        description: "Beautiful soft dress for baby girls."
    },

    {
        id: 1,
        name: "Rose Bloom Dress",
        category: "1–4 Years",
        group: "Toddlers",
        gender: "Girls",
        age: "1–4 Years",
        regularPrice: 2600,
        salePrice: 2199,
        price: 2199,
        old: 2600,
        stock: 10,
        colors: ["Pink"],
        sizes: ["1–2 Years", "3–4 Years"],
        tag: "BEST SELLER",
        photo: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80",
        description: "Stylish cotton dress for girls."
    },

    {
        id: 2,
        name: "Little Boy Classic",
        category: "3–6 Months",
        group: "Baby",
        gender: "Boys",
        age: "3–6 Months",
        regularPrice: 2100,
        salePrice: 1799,
        price: 1799,
        old: 2100,
        stock: 8,
        colors: ["Blue"],
        sizes: ["3–6 Months"],
        tag: "NEW",
        photo: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80",
        description: "Comfortable everyday outfit for boys."
    },

    {
        id: 3,
        name: "Sage Comfort Set",
        category: "6–12 Months",
        group: "Baby",
        gender: "Unisex",
        age: "6–12 Months",
        regularPrice: 2400,
        salePrice: 1999,
        price: 1999,
        old: 2400,
        stock: 14,
        colors: ["Sage"],
        sizes: ["6–9 Months", "9–12 Months"],
        tag: "",
        photo: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=600&q=80",
        description: "Soft comfortable baby set."
    }
];


/* LOAD PRODUCTS */

function getProducts() {

    const saved = localStorage.getItem(PRODUCT_KEY);

    if (saved) {

        try {
            return JSON.parse(saved);
        }

        catch (error) {
            console.log(error);
        }

    }

    localStorage.setItem(
        PRODUCT_KEY,
        JSON.stringify(defaultProducts)
    );

    return defaultProducts;
}


let products = getProducts();


/* LOAD ORDERS */

function getOrders() {

    try {

        return JSON.parse(
            localStorage.getItem(ORDER_KEY)
        ) || [];

    }

    catch {

        return [];

    }
}


/* LOAD REVIEWS */

function getReviews() {

    try {

        return JSON.parse(
            localStorage.getItem(REVIEW_KEY)
        ) || [];

    }

    catch {

        return [];

    }
}


/* SAVE PRODUCTS */

function saveProducts() {

    localStorage.setItem(
        PRODUCT_KEY,
        JSON.stringify(products)
    );

}


/* =========================================
   NAVIGATION
========================================= */

const navItems =
    document.querySelectorAll(".nav-item");

const sections =
    document.querySelectorAll(".section");

const pageTitle =
    document.getElementById("pageTitle");


function openSection(sectionName) {

    sections.forEach(section => {

        section.classList.remove("active");

    });


    const selected =
        document.getElementById(sectionName);

    if (selected) {
        selected.classList.add("active");
    }


    navItems.forEach(item => {

        item.classList.remove("active");

        if (
            item.dataset.section === sectionName
        ) {
            item.classList.add("active");
        }

    });


    const titles = {

        dashboard: "Dashboard",
        products: "Products",
        categories: "Categories",
        orders: "Orders",
        customers: "Customers",
        stock: "Stock",
        reviews: "Reviews"

    };


    pageTitle.textContent =
        titles[sectionName] || "Dashboard";


    document
        .querySelector(".sidebar")
        .classList.remove("show");

}


navItems.forEach(item => {

    item.addEventListener("click", () => {

        openSection(
            item.dataset.section
        );

    });

});


document
    .querySelectorAll("[data-section-btn]")
    .forEach(button => {

        button.addEventListener("click", () => {

            openSection(
                button.dataset.sectionBtn
            );

        });

    });


/* MOBILE MENU */

document
    .getElementById("mobileMenu")
    .addEventListener("click", () => {

        document
            .querySelector(".sidebar")
            .classList.toggle("show");

    });


/* =========================================
   DASHBOARD
========================================= */

function updateDashboard() {

    const orders = getOrders();

    document.getElementById("totalProducts")
        .textContent = products.length;

    document.getElementById("totalOrders")
        .textContent = orders.length;


    const customers = getCustomers();

    document.getElementById("totalCustomers")
        .textContent = customers.length;


    let sales = 0;

    orders.forEach(order => {

        sales += Number(order.total) || 0;

    });


    document.getElementById("totalSales")
        .textContent = "Rs " + sales.toLocaleString();


    renderRecentOrders();
    renderLowStockDashboard();

}


/* RECENT ORDERS */

function renderRecentOrders() {

    const box =
        document.getElementById("recentOrders");
        
    const orders =
        getOrders().slice(-5).reverse();


    if (!orders.length) {

        box.innerHTML =
            `<p class="empty">No orders yet.</p>`;

        return;

    }


    box.innerHTML = orders.map(order => {

        return `

            <div class="mini-row">

                <strong>
                    #${order.orderNo || order.id || "ORDER"}
                </strong>

                <span>
                    ${(order.customer && order.customer.name) || order.name || "Customer"}
                </span>

                <b>
                    Rs ${(Number(order.total) || 0).toLocaleString()}
                </b>

            </div>

        `;

    }).join("");

}


/* LOW STOCK */

function renderLowStockDashboard() {

    const box =
        document.getElementById("lowStockDashboard");

    const low =
        products
            .filter(product =>
                Number(product.stock) <= 5
            )
            .slice(0, 5);


    if (!low.length) {

        box.innerHTML =
            `<p class="empty">No low-stock products.</p>`;

        return;

    }


    box.innerHTML = low.map(product => {

        return `

            <div class="mini-row">

                <span>${product.name}</span>

                <b>
                    ${product.stock} left
                </b>

            </div>

        `;

    }).join("");

}


/* =========================================
   PRODUCT FORM
========================================= */

const productForm =
    document.getElementById("productForm");

const productFormBox =
    document.getElementById("productFormBox");


document
    .getElementById("showProductForm")
    .addEventListener("click", () => {

        resetProductForm();

        productFormBox.classList.remove("hidden");

    });


function closeProductForm() {

    productFormBox.classList.add("hidden");

}


document
    .getElementById("closeProductForm")
    .addEventListener(
        "click",
        closeProductForm
    );


document
    .getElementById("cancelProduct")
    .addEventListener(
        "click",
        closeProductForm
    );


/* RESET FORM */

function resetProductForm() {

    productForm.reset();

    document.getElementById("productId")
        .value = "";

    document.getElementById("formTitle")
        .textContent = "Add New Product";

}


/* SAVE PRODUCT */

productForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const id =
            document.getElementById("productId").value;


        const regularPrice =
            Number(
                document.getElementById("regularPrice").value
            );


        const salePriceInput =
            document.getElementById("salePrice").value;


        const salePrice =
            salePriceInput
                ? Number(salePriceInput)
                : regularPrice;


        const product = {

            id: id
                ? Number(id)
                : Date.now(),

            name:
                document.getElementById("productName").value,

            category:
                document.getElementById("productCategory").value,

            gender:
                document.getElementById("productGender").value,

            age:
                document.getElementById("productAge").value,

            group:
                document.getElementById("productCategory").value,

            regularPrice: regularPrice,

            salePrice: salePrice,

            price: salePrice,

            old: regularPrice,

            stock:
                Number(
                    document.getElementById("productStock").value
                ),

            photo:
                document.getElementById("productImage").value,

            description:
                document.getElementById("productDescription").value,

            colors:
                document.getElementById("productColors").value
                    .split(",")
                    .map(color => color.trim())
                    .filter(Boolean),

            sizes:
                document.getElementById("productSizes").value
                    .split(",")
                    .map(size => size.trim())
                    .filter(Boolean),

            tag:
                document.getElementById("productTag").value

        };


        if (id) {

            products = products.map(item =>
                item.id === Number(id)
                    ? product
                    : item
            );

        }

        else {

            products.push(product);

        }


        saveProducts();

        renderProducts();

        updateDashboard();

        closeProductForm();

    }
);

/* =========================================
   PRODUCTS TABLE
========================================= */

function renderProducts() {

    const tableBody =
        document.getElementById("productsTableBody");

    if (!tableBody) return;

    if (!products.length) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    No products found.
                </td>
            </tr>
        `;

        return;
    }

    tableBody.innerHTML = products.map(product => {

        return `
            <tr>
                <td>
                    <img
                        src="${product.photo || ""}"
                        alt="${product.name}"
                        width="50"
                        height="50"
                        style="object-fit:cover;border-radius:8px;"
                    >
                </td>

                <td>${product.name}</td>

                <td>${product.category || ""}</td>

                <td>
                    Rs ${Number(product.price || 0).toLocaleString()}
                </td>

                <td>${product.stock ?? 0}</td>

                <td>
                    <span class="status-badge">
                        ${Number(product.stock) > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                </td>

                <td>
                    <button
                        class="edit-btn"
                        onclick="editProduct(${product.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteProduct(${product.id})"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `;

    }).join("");

}


/* =========================================
   EDIT PRODUCT
========================================= */

function editProduct(id) {

    const product = products.find(
        item => item.id === Number(id)
    );

    if (!product) return;

    document.getElementById("productId").value =
        product.id;

    document.getElementById("productName").value =
        product.name || "";

    document.getElementById("productCategory").value =
        product.category || "";

    document.getElementById("productGender").value =
        product.gender || "";

    document.getElementById("productAge").value =
        product.age || "";

    document.getElementById("regularPrice").value =
        product.regularPrice ?? product.old ?? product.price ?? "";

    document.getElementById("salePrice").value =
        product.salePrice ?? product.price ?? "";

    document.getElementById("productStock").value =
        product.stock ?? 0;

    document.getElementById("productImage").value =
        product.photo || "";

    document.getElementById("productDescription").value =
        product.description || "";

    document.getElementById("productColors").value =
        Array.isArray(product.colors)
            ? product.colors.join(", ")
            : "";

    document.getElementById("productSizes").value =
        Array.isArray(product.sizes)
            ? product.sizes.join(", ")
            : "";

    document.getElementById("productTag").value =
        product.tag || "";

    document.getElementById("formTitle").textContent =
        "Edit Product";

    productFormBox.classList.remove("hidden");

}


/* =========================================
   DELETE PRODUCT
========================================= */

function deleteProduct(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    products = products.filter(
        product => product.id !== Number(id)
    );

    saveProducts();

    renderProducts();

    updateDashboard();

}


/* =========================================
   PRODUCT SEARCH
========================================= */

const productSearch =
    document.getElementById("productSearch");


if (productSearch) {

    productSearch.addEventListener("input", function() {

        const searchText =
            this.value.toLowerCase().trim();

        const filteredProducts = products.filter(product => {

            return (
                (product.name || "").toLowerCase().includes(searchText) ||
                (product.category || "").toLowerCase().includes(searchText) ||
                (product.gender || "").toLowerCase().includes(searchText)
            );

        });

        const tableBody =
            document.getElementById("productsTableBody");

        if (!tableBody) return;

        if (!filteredProducts.length) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="7">
                        No matching products found.
                    </td>
                </tr>
            `;

            return;
        }

        tableBody.innerHTML = filteredProducts.map(product => `

            <tr>
                <td>
                    <img
                        src="${product.photo || ""}"
                        alt="${product.name}"
                        width="50"
                        height="50"
                        style="object-fit:cover;border-radius:8px;"
                    >
                </td>

                <td>${product.name}</td>

                <td>${product.category || ""}</td>

                <td>
                    Rs ${Number(product.price || 0).toLocaleString()}
                </td>

                <td>${product.stock ?? 0}</td>

                <td>
                    ${Number(product.stock) > 0 ? "In Stock" : "Out of Stock"}
                </td>

                <td>
                    <button
                        class="edit-btn"
                        onclick="editProduct(${product.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteProduct(${product.id})"
                    >
                        Delete
                    </button>
                </td>
            </tr>

        `).join("");

    });

}


/* =========================================
   INITIAL PRODUCT RENDER
========================================= */

renderProducts();

/* =========================================
   ORDERS
========================================= */

function renderOrders() {

    const tableBody =
        document.getElementById("ordersTableBody");

    if (!tableBody) return;

    const orders = getOrders();

    if (!orders.length) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6">No orders found.</td>
            </tr>
        `;

        return;
    }

    tableBody.innerHTML = orders.map(order => {

        const customer = order.customer || order;

        return `
            <tr>
                <td>#${order.orderNo || order.id || "ORDER"}</td>

                <td>${customer.name || "Customer"}</td>

                <td>${customer.phone || "N/A"}</td>

                <td>
                    Rs ${Number(order.total || 0).toLocaleString()}
                </td>

                <td>
                    <select onchange="updateOrderStatus('${order.orderNo || order.id}', this.value)">
                        <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
                        <option value="Processing" ${order.status === "Processing" ? "selected" : ""}>Processing</option>
                        <option value="Shipped" ${order.status === "Shipped" ? "selected" : ""}>Shipped</option>
                        <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
                        <option value="Cancelled" ${order.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
                    </select>
                </td>

                <td>${order.date || "N/A"}</td>
            </tr>
        `;

    }).join("");

}


/* UPDATE ORDER STATUS */

function updateOrderStatus(orderId, status) {

    const orders = getOrders();

    const updatedOrders = orders.map(order => {

        if (
            String(order.orderNo || order.id) === String(orderId)
        ) {
            return {
                ...order,
                status: status
            };
        }

        return order;

    });

    localStorage.setItem(
        ORDER_KEY,
        JSON.stringify(updatedOrders)
    );

    renderOrders();
    updateDashboard();

}


/* =========================================
   CUSTOMERS
========================================= */

function getCustomers() {

    const orders = getOrders();

    const customers = [];

    orders.forEach(order => {

        const customer = order.customer || order;

        const phone = customer.phone || "";

        const existing = customers.find(
            item => item.phone === phone
        );

        if (!existing) {

            customers.push({

                name: customer.name || "Customer",

                phone: phone,

                email: customer.email || "",

                city: customer.city || "",

                orders: 1,

                totalSpent: Number(order.total) || 0

            });

        } else {

            existing.orders += 1;

            existing.totalSpent +=
                Number(order.total) || 0;

        }

    });

    return customers;

}


/* RENDER CUSTOMERS */

function renderCustomers() {

    const tableBody =
        document.getElementById("customersTableBody");

    if (!tableBody) return;

    const customers = getCustomers();

    if (!customers.length) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="5">No customers found.</td>
            </tr>
        `;

        return;
    }

    tableBody.innerHTML = customers.map(customer => `

        <tr>
            <td>${customer.name}</td>

            <td>${customer.phone || "N/A"}</td>

            <td>${customer.email || "N/A"}</td>

            <td>${customer.orders}</td>

            <td>
                Rs ${customer.totalSpent.toLocaleString()}
            </td>
        </tr>

    `).join("");

}


/* =========================================
   STOCK
========================================= */

function renderStock() {

    const tableBody =
        document.getElementById("stockTableBody");

    if (!tableBody) return;

    if (!products.length) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="4">No products found.</td>
            </tr>
        `;

        return;
    }

    tableBody.innerHTML = products.map(product => `

        <tr>
            <td>${product.name}</td>

            <td>${product.category || "N/A"}</td>

            <td>${product.stock ?? 0}</td>

            <td>
                ${
                    Number(product.stock) <= 0
                        ? "Out of Stock"
                        : Number(product.stock) <= 5
                            ? "Low Stock"
                            : "In Stock"
                }
            </td>
        </tr>

    `).join("");

}


/* =========================================
   REVIEWS
========================================= */

function renderReviews() {

    const tableBody =
        document.getElementById("reviewsTableBody");

    if (!tableBody) return;

    const reviews = getReviews();

    if (!reviews.length) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="4">No reviews found.</td>
            </tr>
        `;

        return;
    }

    tableBody.innerHTML = reviews.map(review => `

        <tr>
            <td>${review.name || review.customer || "Customer"}</td>

            <td>${review.productName || "Product"}</td>

            <td>${review.rating || "N/A"}</td>

            <td>${review.comment || review.message || ""}</td>
        </tr>

    `).join("");

}


/* =========================================
   INITIALIZE ADMIN PANEL
========================================= */

function initializeAdmin() {

    renderProducts();

    renderOrders();

    renderCustomers();

    renderStock();

    renderReviews();

    updateDashboard();

}


/* RUN ADMIN PANEL */

document.addEventListener(
    "DOMContentLoaded",
    initializeAdmin
);