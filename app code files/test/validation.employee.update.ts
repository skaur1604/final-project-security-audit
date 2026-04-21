import { updateEmployeeSchema } from "../src/api/v1/validation/employee.schema";

describe("updateEmployeeSchema validation", () => {
  it("allows updating a single field", async () => {
    await expect(
      updateEmployeeSchema.validateAsync({ email: "test.user@company.com" })
    ).resolves.not.toThrow();
  });

  it("fails when no fields are provided", async () => {
    await expect(
      updateEmployeeSchema.validateAsync({})
    ).rejects.toBeDefined();
  });
});
