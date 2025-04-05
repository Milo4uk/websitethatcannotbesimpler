let cartItems = []
let userBouquetChoice = null
let bouquetCount = 0

const productsList = document.getElementById("productsList")
const clearCartBtn = document.getElementById("clearCartBtn")
const cartContent = document.getElementById("cartContent")
const searchInput = document.getElementById("searchInput")

productsList.addEventListener("click", function (event) {
  if (event.target.classList.contains("addToCartBtn")) {
    const productElement = event.target.closest(".product")
    const productId = productElement.getAttribute("data-id")
    
    if (productId === "Цветочек" && userBouquetChoice === true) {
      bouquetCount++
      updateCartDisplay()
    } else {
      cartItems.push(productId)
      updateCartDisplay()
      bouquet()
    }
  }
})

clearCartBtn.addEventListener("click", function () {
  cartItems = []
  userBouquetChoice = null
  bouquetCount = 0
  document.getElementById("cartContent").outerHTML = `
    <div id="cartContent">
      <p>Корзина очищена!</p>
    </div>
  `
})

productsList.addEventListener("dblclick", function (event) {
  if (event.target.tagName.toLowerCase() === "h3") {
    event.target.style.color = "red"
  }
})

productsList.addEventListener("mouseover", function (event) {
  const productEl = event.target.closest(".product")
  if (productEl) {
    productEl.style.backgroundColor = "#fafafa"
    const hoveredId = productEl.getAttribute("data-id")
    console.log(`Курсор над товаром data-id=${hoveredId}, DOM ID=${productEl.id}`)
  }
})

productsList.addEventListener("mouseout", function (event) {
  const productEl = event.target.closest(".product")
  if (productEl) {
    productEl.style.backgroundColor = "#fff"
  }
})

productsList.addEventListener("contextmenu", function (event) {
  event.preventDefault()
  alert("Контекстное меню для списка товаров запрещено.")
})

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    alert(`Поиск: ${searchInput.value}`)
  }
  if (event.ctrlKey && event.key.toLowerCase() === "c") {
    alert("Вы нажали Ctrl + C")
  } else if (event.ctrlKey && event.key.toLowerCase() === "v") {
    alert("Вы нажали Ctrl + V")
  }
})

searchInput.addEventListener("focus", function () {
  console.log("Поле поиска получило фокус.")
})

searchInput.addEventListener("blur", function () {
  console.log("Поле поиска потеряло фокус.")
})

function updateCartDisplay() {
  const currentCartContent = document.getElementById("cartContent")
  if (cartItems.length === 0 && bouquetCount === 0) {
    currentCartContent.innerHTML = "<p>Корзина пуста.</p>"
    return
  }
  currentCartContent.innerHTML = ""
  const ul = document.createElement("ul")
  cartItems.forEach(itemId => {
    if (itemId === "Букет") {
      const li = document.createElement("li")
      li.textContent = `Букет (${bouquetCount} цветочков)`
      ul.appendChild(li)
    } else {
      const li = document.createElement("li")
      li.textContent = `Товар: ${itemId}`
      ul.appendChild(li)
    }
  })
  currentCartContent.appendChild(ul)
  currentCartContent.insertAdjacentText("afterbegin", "Ваши товары в корзине:\n")
}

function bouquet() {
  const numOfFlowers = cartItems.filter(item => item === "Цветочек").length
  if (numOfFlowers > 4 && userBouquetChoice === null) {
    const choice = confirm("Вам собрать цветы в букет?")
    userBouquetChoice = choice
    if (choice) {
      bouquetCount = numOfFlowers
      cartItems = cartItems.filter(item => item !== "Цветочек")
      cartItems.push("Букет")
      updateCartDisplay()
      alert(`Собран букет из ${bouquetCount} цветочков!`)
    }
  }
}
