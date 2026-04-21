import express, { Router } from "express";
import * as branchController from '../controllers/branch.controller';


import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} from "../controllers/employee.controller";

const router: Router = express.Router();

router.get("/", getAllEmployees);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.get("/:id", getEmployeeById);
router.post('/', branchController.createBranch);

export default router;

