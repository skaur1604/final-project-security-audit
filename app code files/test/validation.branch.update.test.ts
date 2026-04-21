import Joi from "joi";

const editBranchSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  address: Joi.string().min(5).max(200),
  phone: Joi.string().min(7).max(20),
}).min(1);

describe("editBranchSchema validation", () => {
  it("allows updating only one field", async () => {
    const partialData = { name: "Downtown" };
    await expect(editBranchSchema.validateAsync(partialData))
      .resolves.not.toThrow();
  });

  it("throws an error when no fields are provided", async () => {
    const emptyPayload = {};
    await expect(editBranchSchema.validateAsync(emptyPayload))
      .rejects.toBeDefined();
  });
});
