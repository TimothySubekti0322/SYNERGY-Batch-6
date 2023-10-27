class App {
  constructor() {
    this.carContainerElement = document.getElementById("cars-container");
  }

  async init(filter) {
    this.clear();
    await this.load(filter);
  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      // node.classList.add("col-4");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load(filter) {
    const cars = await Binar.listCars(filter);
    console.log("cars");
    console.log(cars);
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}

// class Filter {

//   constructor() {
//     this.filterDriverTypeElement = document.getElementById("driverType");
//     this.filterDateElement = document.getElementById("date");
//     this.filterTimeElement = document.getElementById("time");
//     this.filterPassangerElement = document.getElementById("passanger");
//     this.driverType = "";
//     this.date = "";
//     this.time = "";
//     this.passanger = "";
//   }

//   setDriverType = (driverType) => {
//     this.driverType = driverType;
//     console.log(this.driverType);
//   }

//   setDate = (date) => {
//     this.date = date;
//     console.log(this.date);
//   }

//   setTime = (time) => {
//     this.time = time;
//     console.log(this.time);
//   }

//   setPassanger = (passanger) => {
//     this.passanger = passanger;
//     console.log(this.passanger);
//   }

//   filterCars(car) {
//     const filteredByDriverType = (!this.driverType);
//     const filteredByDate = (!this.date);
//     const filteredByTime = (!this.time);
//     const filteredByPassanger = (!this.passanger);

//     if (filteredByDriverType && filteredByDate && filteredByTime && filteredByPassanger) {
//       return (
//         car.driverType === this.driverType &&
//         car.availableAt.getDate() === this.date &&
//         car.availableAt.getHours() === this.time &&
//         car.passanger === this.passanger
//       );
//     }
//     else if (filteredByDriverType && filteredByDate && filteredByTime) {
//       return (
//         car.driverType === this.driverType &&
//         car.availableAt.getDate() === this.date &&
//         car.availableAt.getHours() === this.time
//       );
//     }
//     else if (filteredByDriverType && filteredByDate && filteredByPassanger) {
//       return (
//         car.driverType === this.driverType &&
//         car.availableAt.getDate() === this.date &&
//         car.passanger === this.passanger
//       );
//     }
//     else if (filteredByDriverType && filteredByTime && filteredByPassanger) {
//       return (
//         car.driverType === this.driverType &&
//         car.availableAt.getHours() === this.time &&
//         car.passanger === this.passanger
//       );
//     }
//     else if (filteredByDate && filteredByTime && filteredByPassanger) {
//       return (
//         car.availableAt.getDate() === this.date &&
//         car.availableAt.getHours() === this.time &&
//         car.passanger === this.passanger
//       );
//     }
//     else if (filteredByDriverType && filteredByDate) {
//       return (
//         car.driverType === this.driverType &&
//         car.availableAt.getDate() === this.date
//       );
//     }
//     else if (filteredByDriverType && filteredByTime) {
//       return (
//         car.driverType === this.driverType &&
//         car.availableAt.getHours() === this.time
//       );
//     }
//     else if (filteredByDriverType && filteredByPassanger) {
//       return (
//         car.driverType === this.driverType &&
//         car.passanger === this.passanger
//       );
//     }
//     else if (filteredByDate && filteredByTime) {
//       return (
//         car.availableAt.getDate() === this.date &&
//         car.availableAt.getHours() === this.time
//       );
//     }
//     else if (filteredByDate && filteredByPassanger) {
//       return (
//         car.availableAt.getDate() === this.date &&
//         car.passanger === this.passanger
//       );
//     }
//     else if (filteredByTime && filteredByPassanger) {
//       return (
//         car.availableAt.getHours() === this.time &&
//         car.passanger === this.passanger
//       );
//     }
//     else if (filteredByDriverType) {
//       return car.driverType === this.driverType;
//     }
//     else if (filteredByDate) {
//       return car.availableAt.getDate() === this.date;
//     }
//     else if (filteredByTime) {
//       return car.availableAt.getHours() === this.time;
//     }
//     else if (filteredByPassanger) {
//       return car.passanger === this.passanger;
//     }
//     else {
//       return true;
//     }

//   }
// }