const carelloAdd = document.querySelectorAll('.carelloAdd')
const cartList = document.getElementById('cartList')
const cartTotal = document.getElementById('cartTotal')

function updateTotal() {
    let total = 0
    cartList.querySelectorAll('li').forEach(item => {
        total += parseFloat(item.dataset.price)
    })
    cartTotal.textContent = 'Totale: € ' + total.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

carelloAdd.forEach(button => {
    button.addEventListener('click', () => {
        const openModal = document.querySelector('.modal.show')
        const productName = openModal.querySelector('.modal-title').textContent
        const productImg = openModal.querySelector('img').src
        const productPriceText = openModal.querySelector('p.fw-bold').textContent.trim()
        const productPrice = parseFloat(productPriceText.replace('€', '').trim().replace(/\./g, '').replace(',', '.'))

        const li = document.createElement('li')
        li.className = 'list-group-item d-flex align-items-center gap-3'
        li.dataset.price = productPrice

        const img = document.createElement('img')
        img.src = productImg
        img.style.cssText = 'width:55px; height:55px; object-fit:contain;'

        const name = document.createElement('span')
        name.className = 'flex-grow-1 fw-semibold'
        name.textContent = productName

        const price = document.createElement('span')
        price.className = 'text-success fw-bold'
        price.textContent = productPriceText

        const deleteBtn = document.createElement('button')
        deleteBtn.className = 'btn btn-sm btn-outline-danger'
        deleteBtn.textContent = '✕'
        deleteBtn.addEventListener('click', () => {
            li.remove()
            updateTotal()
        })

        li.appendChild(img)
        li.appendChild(name)
        li.appendChild(price)
        li.appendChild(deleteBtn)
        cartList.appendChild(li)

        updateTotal()

        bootstrap.Modal.getInstance(openModal).hide()
    })
})
