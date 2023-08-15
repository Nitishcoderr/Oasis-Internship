let ferResult = document.getElementById('ferResult');
let kelResult = document.getElementById('kelResult');
let mainInput = document.getElementById('mainInput');
let converterButton = document.getElementById('converter');

const myFunction = () => {
    let temp = document.getElementById('temp').value;
    let inputValue = parseFloat(mainInput.value);

    if (temp === 'fahrenheit') {
        ferResult.innerHTML = ((inputValue * 9 / 5) + 32);
    } else if (temp === 'kelvin') {
        kelResult.innerHTML = (inputValue + 273.15);
    }
};

const reset=()=>{
    kelResult.innerHTML = ''
    ferResult.innerHTML=''
    mainInput.value=''
}

converterButton.addEventListener('click', myFunction);
