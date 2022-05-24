const openFormBtn = document.querySelector('.openBtn')
const form = document.querySelector('form')
const cancelBtn = document.querySelector('.cancelBtn')
const sendBtn = document.querySelector('.sendBtn')
const body = document.querySelector('body')
const nameFlower = document.getElementById('textInput')
const ageFlower = document.getElementById('AgeInput')
const frequency = document.getElementById('frequencyInput')
const form1 = document.getElementById('form1')
const form2 = document.getElementById('form2')
const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;
const valueMissing = document.querySelectorAll('.missingValue')
const valueRus = document.querySelector('.rusValue')





openFormBtn.addEventListener('click', (e) => {
	form.classList.add('create')
	body.style.backgroundColor = 'rgb(0,0,0, 0.6)'
})
cancelBtn.addEventListener('click', () => {
	form.classList.remove('create')
	body.style.backgroundColor = ''

})
sendBtn.addEventListener('click', (e) => {
	e.preventDefault()

	const dataTrue = checking()
	// console.log(dataTrue)
	if (dataTrue) {
		data = {
			nameFlower: nameFlower.value,
			ageFlower: ageFlower.value,
			frequency: frequency.value,
		}
		if (form1.checked) {
			data.potShape = form1.value
		} else {
			data.potShape = form2.value
		}
		console.log(data)
		
		const PushInfo =  request('/api/information', 'POST', data)
		// console.log(PushInfo.body)
	}


})



async function checking() {
	if (nameFlower.value == '') {
		nameFlower.classList.add('warning')
		valueMissing[0].style.display = 'block'
	} else {
		nameFlower.classList.remove('warning')
		valueMissing[0].style.display = ''
	}
	if (ageFlower.value == '') {
		ageFlower.classList.add('warning')
		valueMissing[1].style.display = 'block'
	} else {
		ageFlower.classList.remove('warning')
		valueMissing[1].style.display = ''
	}
	if (!cyrillicPattern.test(nameFlower.value)) {
		nameFlower.classList.add('warning')
		valueRus.style.display = 'block'
	} else {
		nameFlower.classList.remove('warning')
		valueRus.style.display = 'none'
	}
	return false
}

async function request(url, method = 'GET', data = null) {
	try {
		const headers = {};
		let body;

		if (data) {
			headers['Content-Type'] = 'application/json';
			body = JSON.stringify(data);
		}
		console.log('req:', body);
		const response = await fetch(url, {
			method,
			headers,
			body
		})
		return await response;
	} catch (e) {
		console.warn(`Erorr: ${e.message}`);
	}
}
