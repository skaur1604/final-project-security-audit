import { Router } from "express";
import * as employeeCtrl from "../controllers/employee.controller";
import { runValidation } from "../middleware/Validate"; 
import { createEmployeeSchema, updateEmployeeSchema } from "../validation/employee.schema";

const employeeRouter = Router();


employeeRouter.post("/", runValidation(createEmployeeSchema), employeeCtrl.createEmployee);
employeeRouter.get("/", employeeCtrl.getAllEmployees);
employeeRouter.get("/:id", employeeCtrl.getEmployeeById);
employeeRouter.put("/:id", runValidation(updateEmployeeSchema), employeeCtrl.updateEmployee);
employeeRouter.delete("/:id", employeeCtrl.deleteEmployee);
employeeRouter.get("/branch/:branchId", employeeCtrl.getEmployeesForBranch);
employeeRouter.get("/department/:department", employeeCtrl.getEmployeesByDepartment);

export default employeeRouter;
