const carrelloAdd = document.querySelectorAll('.carrelloAdd')
const cardAggiungi = document.querySelectorAll('.cardAggiungi')
const cartList = document.getElementById('cartList')
const cartTotal = document.getElementById('cartTotal')
const darkModeBtn = document.getElementById('darkModeBtn')
const cartCount = document.getElementById('cartCount')
const confermaElimina = document.getElementById('confermaElimina')
const modalConfermaElimina = new bootstrap.Modal(document.getElementById('modalConfermaElimina'))
const cartDropdown = document.getElementById('cartDropdown')
const dropdownCartList = document.getElementById('dropdownCartList')
const dropdownCartTotal = document.getElementById('dropdownCartTotal')

let itemDaEliminare = null

function updateDropdown() {
    dropdownCartList.innerHTML = ''
    cartList.querySelectorAll('li').forEach(li => {
        const clone = document.createElement('li')
        clone.className = 'list-group-item d-flex align-items-center gap-2'
        const img = document.createElement('img')
        img.src = li.querySelector('img').src
        img.style.cssText = 'width:40px; height:40px; object-fit:contain;'
        const name = document.createElement('span')
        name.className = 'flex-grow-1'
        name.textContent = li.dataset.name
        const qty = document.createElement('span')
        qty.className = 'text-secondary'
        qty.textContent = 'x' + li.dataset.qty
        const price = document.createElement('span')
        price.className = 'text-success fw-bold'
        price.textContent = li.querySelector('.text-success').textContent
        clone.appendChild(img)
        clone.appendChild(name)
        clone.appendChild(qty)
        clone.appendChild(price)
        dropdownCartList.appendChild(clone)
    })
    dropdownCartTotal.textContent = cartTotal.textContent
}

let cartDropdownTimer = null

function showCartDropdown() {
    updateDropdown()
    cartDropdown.classList.remove('d-none')
    clearTimeout(cartDropdownTimer)
    cartDropdownTimer = setTimeout(() => {
        cartDropdown.classList.add('d-none')
    }, 3000)
}

document.addEventListener('click', (e) => {
    if (!cartDropdown.contains(e.target) && !e.target.closest('.cardAggiungi')) {
        cartDropdown.classList.add('d-none')
    }
})

function updateCount() {
    let total = 0
    cartList.querySelectorAll('li').forEach(item => {
        total += parseInt(item.dataset.qty)
    })
    cartCount.textContent = total
}

function updateTotal() {
    let total = 0
    cartList.querySelectorAll('li').forEach(item => {
        total += parseFloat(item.dataset.price) * parseInt(item.dataset.qty)
    })
    cartTotal.textContent = 'Totale: € ' + total.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

carrelloAdd.forEach(button => {
    button.addEventListener('click', () => {
        const openModal = document.querySelector('.modal.show')
        const productName = openModal.querySelector('.modal-title').textContent
        const productImg = openModal.querySelector('img').src
        const productPriceText = openModal.querySelector('p.fw-bold').textContent.trim()
        const productPrice = parseFloat(productPriceText.replace('€', '').trim().replace(/\./g, '').replace(',', '.'))

        const existing = [...cartList.querySelectorAll('li')].find(li => li.dataset.name === productName)

        if (existing) {
            existing.dataset.qty = parseInt(existing.dataset.qty) + 1
            existing.querySelector('.qty-label').textContent = existing.dataset.qty
        } else {
            const li = document.createElement('li')
            li.className = 'list-group-item d-flex align-items-center gap-3'
            li.dataset.price = productPrice
            li.dataset.qty = 1
            li.dataset.name = productName

            const img = document.createElement('img')
            img.src = productImg
            img.style.cssText = 'width:55px; height:55px; object-fit:contain;'

            const name = document.createElement('span')
            name.className = 'flex-grow-1 fw-semibold'
            name.textContent = productName

            const minusBtn = document.createElement('button')
            minusBtn.className = 'btn btn-sm btn-outline-secondary'
            minusBtn.textContent = '-'
            minusBtn.addEventListener('click', () => {
                const qty = parseInt(li.dataset.qty) - 1
                if (qty <= 0) {
                    li.remove()
                } else {
                    li.dataset.qty = qty
                    qtyLabel.textContent = qty
                }
                updateTotal()
                updateCount()
            })

            const qtyLabel = document.createElement('span')
            qtyLabel.className = 'qty-label'
            qtyLabel.textContent = '1'

            const plusBtn = document.createElement('button')
            plusBtn.className = 'btn btn-sm btn-outline-secondary'
            plusBtn.textContent = '+'
            plusBtn.addEventListener('click', () => {
                li.dataset.qty = parseInt(li.dataset.qty) + 1
                qtyLabel.textContent = li.dataset.qty
                updateTotal()
                updateCount()
            })

            const price = document.createElement('span')
            price.className = 'text-success fw-bold'
            price.textContent = productPriceText

            const deleteBtn = document.createElement('button')
            deleteBtn.className = 'btn btn-sm btn-outline-danger'
            deleteBtn.textContent = '✕'
            deleteBtn.addEventListener('click', () => {
                itemDaEliminare = li
                modalConfermaElimina.show()
            })

            li.appendChild(img)
            li.appendChild(name)
            li.appendChild(price)
            li.appendChild(minusBtn)
            li.appendChild(qtyLabel)
            li.appendChild(plusBtn)
            li.appendChild(deleteBtn)
            cartList.appendChild(li)
        }

        updateTotal()
        updateCount()

        bootstrap.Modal.getInstance(openModal).hide()
    })
})

confermaElimina.addEventListener('click', () => {
    if (itemDaEliminare) {
        itemDaEliminare.remove()
        itemDaEliminare = null
        updateTotal()
        updateCount()
    }
    modalConfermaElimina.hide()
})

document.querySelectorAll('.modal:not(#modal4):not(#modalConfermaElimina)').forEach(modal => {
    modal.addEventListener('show.bs.modal', event => {
        const card = event.relatedTarget.closest('.card')
        const img = card.querySelector('img')
        const price = card.querySelector('p.card-text').textContent

        modal.querySelector('.modal-body img').src = img.src
        modal.querySelector('.modal-body img').alt = img.alt
        modal.querySelector('p.fw-bold').textContent = price
    })
})

cardAggiungi.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card')
        const productName = card.querySelector('h4').textContent
        const productImg = card.querySelector('img').src
        const productPriceText = card.querySelector('p.card-text').textContent.trim()
        const productPrice = parseFloat(productPriceText.replace('€', '').trim().replace(/\./g, '').replace(',', '.'))

        const existing = [...cartList.querySelectorAll('li')].find(li => li.dataset.name === productName)

        if (existing) {
            existing.dataset.qty = parseInt(existing.dataset.qty) + 1
            existing.querySelector('.qty-label').textContent = existing.dataset.qty
        } else {
            const li = document.createElement('li')
            li.className = 'list-group-item d-flex align-items-center gap-3'
            li.dataset.price = productPrice
            li.dataset.qty = 1
            li.dataset.name = productName

            const img = document.createElement('img')
            img.src = productImg
            img.style.cssText = 'width:55px; height:55px; object-fit:contain;'

            const name = document.createElement('span')
            name.className = 'flex-grow-1 fw-semibold'
            name.textContent = productName

            const minusBtn = document.createElement('button')
            minusBtn.className = 'btn btn-sm btn-outline-secondary'
            minusBtn.textContent = '-'
            minusBtn.addEventListener('click', () => {
                const qty = parseInt(li.dataset.qty) - 1
                if (qty <= 0) {
                    li.remove()
                } else {
                    li.dataset.qty = qty
                    qtyLabel.textContent = qty
                }
                updateTotal()
                updateCount()
            })

            const qtyLabel = document.createElement('span')
            qtyLabel.className = 'qty-label'
            qtyLabel.textContent = '1'

            const plusBtn = document.createElement('button')
            plusBtn.className = 'btn btn-sm btn-outline-secondary'
            plusBtn.textContent = '+'
            plusBtn.addEventListener('click', () => {
                li.dataset.qty = parseInt(li.dataset.qty) + 1
                qtyLabel.textContent = li.dataset.qty
                updateTotal()
                updateCount()
            })

            const price = document.createElement('span')
            price.className = 'text-success fw-bold'
            price.textContent = productPriceText

            const deleteBtn = document.createElement('button')
            deleteBtn.className = 'btn btn-sm btn-outline-danger'
            deleteBtn.textContent = '✕'
            deleteBtn.addEventListener('click', () => {
                itemDaEliminare = li
                modalConfermaElimina.show()
            })

            li.appendChild(img)
            li.appendChild(name)
            li.appendChild(price)
            li.appendChild(minusBtn)
            li.appendChild(qtyLabel)
            li.appendChild(plusBtn)
            li.appendChild(deleteBtn)
            cartList.appendChild(li)
        }

        updateTotal()
        updateCount()
        showCartDropdown()
    })
})

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')
    darkModeBtn.textContent = document.body.classList.contains('dark-mode') ? 'Tema Chiaro' : 'Tema Scuro'
})
