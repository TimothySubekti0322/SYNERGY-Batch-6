class Car {

  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  static viewList() {
    console.log(this.list);
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }
  render() {
    return `
      <div class="card" style="width: 100%; height:100%">
        <img src=${this.image} class="card-img-top" alt="..." style="width: 100%; height:18rem">
        <div class="card-body">
          <h5 class="card-title">Rp. ${this.rentPerDay} / hari</h5>
          <p class="card-text">${this.description}</p>
          <p class="card-text">${this.capacity} orang </p>
          <p class="card-text">${this.transmission}</p>
          <p class="card-text">${this.year}</p>
          <div class="w-full d-flex justify-content-center">
            <a href="#" class="btn btn-primary" style="background-color: #5cb85f; width:100%;">Pilih Mobil</a>
          </div>
          
        </div>
      </div>
    `;
  }
}
