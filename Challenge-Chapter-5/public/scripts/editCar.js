const inputName = document.getElementById('name');
const inputCost = document.getElementById('cost');
const inputSize = document.getElementById('size');
const submitBtn = document.getElementById('submit');
const id = document.getElementById('carID').value;
const formUpload = document.getElementById('form-upload');
const imageUrl = document.getElementById('photo-preview').getAttribute('src');
const fileName = document.getElementById('file-name');
const photo = document.getElementById('photo');
photo.addEventListener('change', handleChangeInputFile);

console.log(imageUrl);

var name = inputName.value;
var cost = inputCost.value;
var size = inputSize.value;

function handleChangeInputFile(e) {
    const files = e.target.files;

    if (files && files.length > 0) {
        // render preview
        const [file] = files;
        console.log(file);
        fileName.textContent = trimFileName(file.name);
    }
}

function trimFileName(fileName) {
    const maxLength = 15;
    const extension = fileName.slice(-4);

    if (fileName.length > maxLength) {
        return fileName.substring(0, maxLength) + '...' + extension;
    } else {
        return fileName;
    }
}

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

    // Change button text and disable it
    submitBtn.innerHTML = "Loading...";
    submitBtn.disabled = true;
    submitBtn.classList.add("loading");

    // Create formData
    const formData = new FormData(formUpload);

    // add Old image url
    formData.append('imageurl', imageUrl);

    // fetch API
    fetch(`/api/cars/${id}`, {
        method: 'PATCH',
        body: formData,
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
    }).finally(() => {

        // Change button text and enable it
        submitBtn.innerHTML = "Submit";
        submitBtn.disabled = false;
        submitBtn.classList.remove("loading");
    });
}