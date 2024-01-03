import { Router } from "express";
import Auth from "../../middlewares/Auth";
import ControllerOrder from "../../controllers/ControllerOrder";

class ApiOrders {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  routes() {
    this.router.get("/", Auth.authorizeAdminOrSuperAdmin, ControllerOrder.list); // GET /api/orders -> Menampilkan Pesanan

    this.router.get("/:id", ControllerOrder.show); // GET /api/orders/:id -> Menampilkan Pesanan Berdasarkan ID

    this.router.post("/", ControllerOrder.create); // POST /api/orders -> Menambahkan Pesanan

    this.router.delete(
      "/:id",
      Auth.authorizeAdminOrSuperAdmin,
      ControllerOrder.remove
    ); // DELETE /api/orders/:id -> Menghapus Pesanan Berdasarkan ID

    this.router.put(
      "/:id",
      Auth.authorizeAdminOrSuperAdmin,
      ControllerOrder.update
    ); // PUT /api/orders/:id -> Mengubah Pesanan Berdasarkan ID

    return this.router;
  }
}

export default new ApiOrders();
