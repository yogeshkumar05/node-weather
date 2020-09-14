// client side JS

// fetch('https://api.covid19india.org/raw_data1.json').then((response) => {
//     response.json().then((data) => {
//         console.log('response data', data);
//     })
// });




const weatherForm = document.querySelector('form');
const searchElem = document.querySelector('input');

const erroElem = document.querySelector('.error');
const weatherElm = document.querySelector('.weather');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchElem.value;
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.Error) {
                erroElem.textContent = data.Error;
                weatherElm.textContent = '';
                console.log('Error', data.Error)
            } else {
                weatherElm.textContent = data.Forecast[0];
                erroElem.textContent = '';
                console.log('Weather', data)
            }

            });
        })
    }
);