class Filter {

    constructor() {
        this.filterDriverTypeElement = document.getElementById("driverType");
        this.filterDateElement = document.getElementById("date");
        this.filterTimeElement = document.getElementById("time");
        this.filterPassangerElement = document.getElementById("passanger");
        this.driverType = "";
        this.date = "";
        this.time = "";
        this.passanger = "";
    }

    setDriverType = (driverType) => {
        this.driverType = driverType;
        console.log(this.driverType);
    }

    setDate = (date) => {
        this.date = date;
        console.log(this.date);
    }

    setTime = (time) => {
        this.time = time;
        console.log(this.time);
    }

    setPassanger = (passanger) => {
        this.passanger = passanger;
        console.log(this.passanger);
    }

    static filterByType(type, data) {

    }
}
