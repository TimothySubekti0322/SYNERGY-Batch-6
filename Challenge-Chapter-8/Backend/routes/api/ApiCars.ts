import { Router } from "express";
import Auth from "../../middlewares/Auth";
import ControllerCars from "../../controllers/ControllerCars";
import media from "../../config/media";

class ApiCars {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  routes() {
    this.router.get("/", Auth.authorizeAdminOrSuperAdmin, ControllerCars.list); // GET /api/cars -> Menampilkan Mobil

    this.router.get(
      "/available",
      Auth.authorizeAdminOrSuperAdmin,
      ControllerCars.available
    );

    this.router.get(
      "/:id",
      Auth.authorizeAdminOrSuperAdmin,
      ControllerCars.show
    ); // GET /api/cars/:id -> Menampilkan Mobil Berdasarkan ID

    this.router.post(
      "/",
      Auth.authorizeAdminOrSuperAdmin,
      media.upload.single("photo"),
      ControllerCars.create
    ); // POST /api/cars -> Menambahkan Mobil

    this.router.put(
      "/:id",
      Auth.authorizeAdminOrSuperAdmin,
      media.upload.single("photo"),
      ControllerCars.update
    ); // PUT /api/cars/:id -> Mengubah Mobil Berdasarkan ID

    this.router.delete(
      "/:id",
      Auth.authorizeAdminOrSuperAdmin,
      ControllerCars.remove
    ); // DELETE /api/cars/:id -> Menghapus Mobil Berdasarkan ID

    return this.router;
  }
}

export default new ApiCars();
