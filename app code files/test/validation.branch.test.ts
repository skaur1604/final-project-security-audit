import { branchCreateSchema } from "../src/api/v1/validation/branch.schema";

describe("branchCreateSchema validation", () => {
  it("passes when the input matches schema requirements", async () => {
    const validPayload = {
      name: "Central Branch",
      address: "25 King Street",
      phone: "+1 204-555-9012"
    };

    await expect(branchCreateSchema.validateAsync(validPayload))
      .resolves.not.toThrow();
  });
  gfdghjk

  it("fails when phone number format is invalid", async () => {
    const invalidPayload = {
      name: "Central Branch",
      address: "25 King Street",
      phone: "123-INVALID"
    };

    await expect(branchCreateSchema.validateAsync(invalidPayload))
      .rejects.toBeDefined();
  });
});
