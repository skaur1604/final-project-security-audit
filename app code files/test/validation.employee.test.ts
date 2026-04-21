import { createEmployeeSchema } from "../src/api/v1/validation/employee.schema";

describe("createEmployeeSchema checks", () => {
  it("passes with a properly formatted employee object", async () => {
    const validEmployee = {
      name: "Aman",
      email: "aman.singh@rrc.ca",
      position: "Analyst",
      department: "Finance",
      phone: "2045551234",
      branchId: "7",
    };

    await expect(createEmployeeSchema.validateAsync(validEmployee))
      .resolves.not.toThrow();
  });

  4
  it("fails when email format is incorrect", async () => {
    const invalidEmployee = {
      name: "Aman",
      email: "not-an-email",
      position: "Analyst",
      department: "Finance",
      phone: "2045551234",
      branchId: "7",
    };

    await expect(createEmployeeSchema.validateAsync(invalidEmployee))
      .rejects.toBeDefined();
  });
});
