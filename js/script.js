(function () {
  'use strict'
  const prekes = document.querySelectorAll('input') // gauti inputus
  //   const item = Object.keys(window.localStorage)

  if (typeof (Storage) === 'undefined') {
    document.body.innerText += 'local storage not working...'
  }

  function refresh () {
    const ul = document.getElementById('list')
    let sum = 0
    ul.innerHTML = ''

    const data = Object.assign({}, window.localStorage)
    for (const keys in data) {
      let array = []
      if (keys !== 'lastKey') {
        array = JSON.parse(data[keys])
        sum += parseFloat(array[3])
        ul.innerHTML +=
                            `<span class="delete" id="id${keys}">&times;</span><span>${array[1]}</span><span>${array[2]}</span><span>${array[3]}</span>`
      }
    }
    ul.innerHTML += `<span></span><span></span><span>viso</span><span>${sum}</span>`
  }

  function validateForm () {
    const x = document.forms.prekes.preke.value
    // const y = document.forms.prekes.kaina.value
    if (x.length > 1) { return true }
  }

  function createElements () {
    if (validateForm()) {
      const items = [] // create array items
      prekes.forEach((elem) => {
        items.push(elem.id, elem.value)
        elem.value = ''
      })
      let lastKey = Number(window.localStorage.lastKey) || (window.localStorage.lastKey = JSON.stringify(0))
      lastKey = window.localStorage.lastKey++
      window.localStorage.setItem(lastKey, JSON.stringify(items))
    }
  }

  function clearLocalStorage () { // delete localStorage
    const retVal = window.confirm('Do you want delete all data?')
    if (retVal === true) {
      window.localStorage.clear()
    } else {
      return false
    }
  }

  function getConfirmation () {
    const retVal = window.confirm('Do you want delete?')
    if (retVal === true) {
      return true
    } else {
      return false
    }
  }

  function deleteOneItem (el) { // delete localStorage one item
    let ids = el.target.id
    ids = ids.replace(/\D/g, '')
    if (getConfirmation()) { window.localStorage.removeItem(ids) }
  }

  document.addEventListener('click', function (e) { // add addEventListener to document
    e.preventDefault()
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SPAN') {
      if (e.target.id === 'primest' && validateForm()) {
        createElements()
      }
      if (e.target.classList.contains('delete')) {
        deleteOneItem(e)
      }
      if (e.target.id === 'clearLocalStorage') {
        clearLocalStorage()
      }
      refresh()
    } else {
      return false
    }
  })
  refresh()
}())
