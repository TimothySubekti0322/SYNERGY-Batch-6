const inputName = document.getElementById('name');
const inputCost = document.getElementById('cost');
const inputSize = document.getElementById('size');
const submitBtn = document.getElementById('submit');
const id = document.getElementById('carID').value;

var name = inputName.value;
var cost = inputCost.value;
var size = inputSize.value;

inputName.addEventListener('change', (event) => {
    console.log(event.target.value);
    name = event.target.value;
});

inputCost.addEventListener('change', (event) => {
    console.log(event.target.value);
    cost = event.target.value;
});

inputSize.addEventListener('change', (event) => {
    console.log(event.target.value);
    size = event.target.value;
});

submitBtn.addEventListener('click', handleSubmit);

async function handleSubmit(e) {
    e.preventDefault();
    const updated_at = new Date();
    const car = {
        name,
        cost,
        size,
        updated_at
    };
    fetch(`/api/cars/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    }).then((res) => {
        console.log(res);
        if (res.ok) {
            console.log('Car updated successfully!');
            window.location.href = '/';
        }
        else {
            console.log(res);
        }
    }).catch((err) => {
        console.log(err);
    });
}