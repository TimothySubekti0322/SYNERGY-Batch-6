/*
 * Contoh kode untuk membaca query parameter,
 * Siapa tau relevan! :)
 * */

// const urlSearchParams = new URLSearchParams(window.location.search);
// const params = Object.fromEntries(urlSearchParams.entries());

// Coba olah data ini hehe :)
// console.log(params);
const app = new App();

const submitFilter = document.getElementById("submit-filter");
const driverTypeFilter = document.getElementById("driverType");
const dateFilter = document.getElementById("date");
const timeFilter = document.getElementById("time");
const passangerFilter = document.getElementById("passanger");
const carsContainer = document.getElementById("cars-container");

var driverType = "";
var date = "";
var time = "";
var passanger = "";

driverTypeFilter.addEventListener("change", (event) => {
    driverType = event.target.value;
});

dateFilter.addEventListener("change", (event) => {
    date = event.target.value;
});

timeFilter.addEventListener("change", (event) => {
    time = event.target.value;
});

passangerFilter.addEventListener("change", (event) => {
    passanger = event.target.value;
});

submitFilter.addEventListener("click", () => {
    const filteredByDriverType = !(!driverType);
    const filteredByDate = !(!date);
    const filteredByTime = !(!time);
    const filteredByPassanger = !(!passanger);

    if (filteredByDriverType && filteredByDate && filteredByTime && filteredByPassanger) {
        const filter = (cars) => {
            return cars.driventype === driverType && new Date(cars.availableAt).getDate() < date && cars.availableAt.getHours() === time && cars.capacity >= passanger;
        }
        app.init(filter).then(app.run);
    }
    else if (filteredByDriverType && filteredByDate && filteredByTime) {
        const filter = (cars) => {
            return cars.driventype === driverType && new Date(cars.availableAt).getDate() < date && cars.availableAt.getHours() === time;
        }
        app.init(filter).then(app.run);
    }
    // else {
    //     const node = document.createElement("div");
    //     node.innerHTML = "Masukan Filter Tipe Driver, tanggal, dan waktu jemput / Ambil";
    //     node.classList.add("alert");
    //     node.setAttribute("role", "alert");
    //     carsContainer.appendChild(node);
    // }
    else if (filteredByDriverType && filteredByDate && filteredByPassanger) {
        const filter = (cars) => {
            return cars.driventype === driverType && new Date(cars.availableAt).getDate() < date && cars.capacity >= passanger;
        }
        app.init(filter).then(app.run);
    }
    else if (filteredByDriverType && filteredByTime && filteredByPassanger) {
        const filter = (cars) => {
            return cars.driventype === driverType && cars.availableAt.getHours() === time && cars.capacity >= passanger;
        }
        app.init(filter).then(app.run);
    }
    else if (filteredByDate && filteredByTime && filteredByPassanger) {
        const filter = (cars) => {
            return new Date(cars.availableAt).getDate() < date && cars.availableAt.getHours() === time && cars.capacity >= passanger;
        }
        app.init(filter).then(app.run);
    }
    else if (filteredByDriverType && filteredByDate) {
        const filter = (cars) => {
            return cars.driventype === driverType && new Date(cars.availableAt).getDate() < date;
        }
        app.init(filter).then(app.run);
    }
    else if (filteredByDriverType && filteredByTime) {
        const filter = (cars) => {
            return cars.driventype === driverType && cars.availableAt.getHours() === time;
        }
        app.init(filter).then(app.run);
    }
    else if (filteredByDriverType && filteredByPassanger) {
        const filter = (cars) => {
            return cars.driventype === driverType && cars.capacity >= passanger;
        }
        app.init(filter).then(app.run);
    }
    else if (filteredByDate && filteredByTime) {
        const filter = (cars) => {
            return new Date(cars.availableAt).getDate() < date && cars.availableAt.getHours() === time;
        }
        app.init(filter).then(app.run);
    }
    else if (filteredByDate && filteredByPassanger) {
        const filter = (cars) => {
            return new Date(cars.availableAt).getDate() < date && cars.capacity >= passanger;
        }
        app.init(filter).then(app.run);
    }
    else if (filteredByTime && filteredByPassanger) {
        const filter = (cars) => {
            return cars.availableAt.getHours() === time && cars.capacity >= passanger;
        }
        app.init(filter).then(app.run);
    }
    else if (filteredByDriverType) {
        const filter = (cars) => {
            return cars.driventype === driverType;
        }
        app.init(filter).then(app.run);
    }
    else if (filteredByDate) {
        const filter = (cars) => {
            return new Date(cars.availableAt).getDate() < date;
        }
        app.init(filter).then(app.run);
    }
    else if (filteredByTime) {
        const filter = (cars) => {
            return cars.availableAt.getHours() === time;
        }
        app.init(filter).then(app.run);
    }
    else if (filteredByPassanger) {
        const filter = (cars) => {
            return cars.capacity >= passanger;
        }
        app.init(filter).then(app.run);
    }
    else {
        app.init().then(app.run);
    }
});

/*
 * Contoh penggunaan DOM di dalam class
 * */

// app.init().then(app.run);
