import { Router } from "express";
import Auth from "../../middlewares/Auth";
import ControllerAuth from "../../controllers/ControllerAuth";

class ApiAuth {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  routes() {
    // POST /api/auth/login -> Melakukan Login
    this.router.post("/login", ControllerAuth.login);

    // POST /api/auth/register -> Melakukan Register member baru
    this.router.post("/register", ControllerAuth.register);

    // POST /api/auth/register-admin -> Melakukan Register admin baru yang hanya bisa dilakukan oleh superadmin
    this.router.post(
      "/register-admin",
      Auth.authorizeSuperAdmin,
      ControllerAuth.registerAdmin
    );

    // GET /api/auth/profile -> Menampilkan profile user yang sedang login
    this.router.get("/profile", ControllerAuth.profile);
    return this.router;
  }
}

export default new ApiAuth();
