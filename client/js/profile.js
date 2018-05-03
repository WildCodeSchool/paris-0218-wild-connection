import countries from './docs/countries.js'
import idioms from './docs/idioms.js'

const countriesElement = countries.map(country => `<option value="${country.name}">${country.name}</option>`).join('')
window.document.getElementById('select-country').innerHTML = countriesElement

const idiomsElement = idioms.map(idiom => `<option value="${idiom.name}">${idiom.name}</option>`).join('')
window.document.getElementById('select-idiom').innerHTML = idiomsElement