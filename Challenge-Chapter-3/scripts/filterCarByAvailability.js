function filterCarByAvailability(cars) {
  // Sangat dianjurkan untuk console.log semua hal hehe

  console.log("Filter Car By Availability");
  console.log(cars);

  let availableCars = [];

  for (let i = 0; i < cars.length; i++) {
    if (cars[i].available == true) {
      availableCars.push(cars[i]);
    }
  }

  // Tempat penampungan hasil
  const result = availableCars;

  // Tulis code-mu disini

  // Rubah code ini dengan array hasil filter berdasarkan availablity
  return result;
}
