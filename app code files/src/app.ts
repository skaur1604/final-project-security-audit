import express, { Express } from "express";
import morgan from "morgan";

import employeeRoutes from "./api/v1/routes/employee.routes";
import branchRoutes from "./api/v1/routes/branch.routes";

const app: Express = express();







app.use(morgan("combined"));
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

export default app;

