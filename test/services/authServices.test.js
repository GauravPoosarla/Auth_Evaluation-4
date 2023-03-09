const authServices = require("../../src/services/authServices");
const db = require("../../database/models");
const authUtils = require("../../src/utils/authUtils");
const bcrypt = require("bcrypt");

describe("authServices", () => {
  describe("register", () => {
    it("should return user created successfully", async () => {
      const resolvedValue = "User created successfully";
      const mockEmail = "poosarlagaurav@gmail.com";
      const mockPassword = "123456";

      jest.spyOn(db.User, "create").mockResolvedValue(resolvedValue);
      const result = await authServices.register(mockEmail, mockPassword);
      expect(result).toEqual(resolvedValue);
    });
  });
  describe("login", () => {
    it("should return token", async () => {
      const resolvedValue =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhdXJhdkBtY2tpbnNleS5jb20iLCJ0aW1lc3RhbXAiOjE2NzgyOTE3NjY1ODEsImlhdCI6MTY3ODI5MTc2Nn0.389BGTNFs4r-TVJ7qd6KAvFP80LDVRpVjfBBnp0rhPE";
      const mockEmail = "poosarlagaurav@gmail.com";
      const mockPassword = "123456";

      jest.spyOn(db.User, "findOne").mockResolvedValue({
        email: mockEmail,
        password: mockPassword,
      });
      jest.spyOn(bcrypt, "compareSync").mockReturnValue(true);
      jest.spyOn(authUtils, "generateToken").mockReturnValue(resolvedValue);
      jest.spyOn(authUtils, "putToken").mockReturnValue(resolvedValue);
      const result = await authServices.login(mockEmail, mockPassword);
      expect(result).toEqual(resolvedValue);
    });
    it("should throw error if user not found", async () => {
      const mockEmail = "poosarlagaurav@gmail.com";
      const mockPassword = "123456";

      jest.spyOn(db.User, "findOne").mockResolvedValue(null);
      jest.spyOn(bcrypt, "compareSync").mockReturnValue(false);
      jest.spyOn(authUtils, "generateToken").mockReturnValue(null);
      jest.spyOn(authUtils, "putToken").mockReturnValue(null);
      await expect(authServices.login(mockEmail, mockPassword)).rejects.toThrow(
        "User not found"
      );
    });
    it("should throw error if password is invalid", async () => {
      const mockEmail = "poosarlagaurav@gmail.com";
      const mockPassword = "123456";

      jest.spyOn(db.User, "findOne").mockResolvedValue({
        email: mockEmail,
        password: mockPassword,
      });
      jest.spyOn(bcrypt, "compareSync").mockReturnValue(false);
      jest.spyOn(authUtils, "generateToken").mockReturnValue(null);
      jest.spyOn(authUtils, "putToken").mockReturnValue(null);
      await expect(authServices.login(mockEmail, mockPassword)).rejects.toThrow(
        "Invalid password"
      );
    });
  });
  describe("validate", () => {
    it("should return true", async () => {
      const resolvedValue = true;
      const mockToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhdXJhdkBtY2tpbnNleS5jb20iLCJ0aW1lc3RhbXAiOjE2NzgyOTE3NjY1ODEsImlhdCI6MTY3ODI5MTc2Nn0.389BGTNFs4r-TVJ7qd6KAvFP80LDVRpVjfBBnp0rhPE";

      jest.spyOn(authUtils, "checkTokenExists").mockResolvedValue(true);
      const result = await authServices.validate(mockToken);
      expect(result).toEqual(resolvedValue);
    });
    it("should throw error if token is invalid", async () => {
      const mockToken =
        "eyJhbGciOiJIUiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhdXJhdkBtY2tpbnNleS5jb20iLCJ0aW1lc3RhbXAiOjE2NzgyOTE3NjY1ODEsImlhdCI6MTY3ODI5MTc2Nn0.389BGTNFs4r-TVJ7qd6KAvFP80LDVRpVjfBBnp0rhPE";

      const resolvedValue = false;
      jest
        .spyOn(authUtils, "checkTokenExists")
        .mockResolvedValue(resolvedValue);
      await expect(authServices.validate(mockToken)).rejects.toThrow(
        "Invalid token"
      );
    });
  });
});
