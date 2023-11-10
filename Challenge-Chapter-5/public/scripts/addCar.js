const photo = document.getElementById('photo');
const fileName = document.getElementById('file-name');
const inputName = document.getElementById('name');
const inputCost = document.getElementById('cost');
const inputSize = document.getElementById('size');
const submitBtn = document.getElementById('submit');
const formUpload = document.getElementById('form-upload');

formUpload.addEventListener('submit', handleSubmit);

photo.addEventListener('change', handleChangeInputFile);

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

submitBtn.addEventListener('click', handleSubmit);

async function handleSubmit(e) {
    e.preventDefault();

    submitBtn.innerHTML = "Loading...";
    submitBtn.disabled = true;
    submitBtn.classList.add("loading");
    const formData = new FormData(formUpload);
    fetch(`/api/cars/`, {
        method: 'POST',
        body: formData,
    }).then((res) => {
        console.log(res);
        if (res.ok) {
            console.log('Car Added successfully!');
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