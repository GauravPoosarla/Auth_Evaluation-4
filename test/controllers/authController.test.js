const authController = require("../../src/controllers/authController");
const authServices = require("../../src/services/authServices");

describe("authController", () => {
  describe("register", () => {
    it("should return 200 and user object", async () => {
      const resolvedValue = "User Created Successfully";
      const mockReq = {
        body: {
          email: "poosarlagaurav@gmail.com",
          password: "123456",
        },
      };
      jest.spyOn(authServices, "register").mockResolvedValue(resolvedValue); // mock not working
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await authController.register(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(resolvedValue);
    });
    it("should return 400 and error message", async () => {
      const rejectedValue = "";
      const mockReq = {
        body: {
          email: "poosarlagaurav@gmail.com",
          password: "123456",
        },
      };
      jest.spyOn(authServices, "register").mockRejectedValue(rejectedValue);
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await authController.register(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalled();
    });
  });
  describe("login", () => {
    it("should return 200 and user object", async () => {
      const resolvedValue =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhdXJhdkBtY2tpbnNleS5jb20iLCJ0aW1lc3RhbXAiOjE2NzgyOTE3NjY1ODEsImlhdCI6MTY3ODI5MTc2Nn0.389BGTNFs4r-TVJ7qd6KAvFP80LDVRpVjfBBnp0rhPE";
      const mockReq = {
        body: {
          email: "poosarlagaurav@gmail.com",
          password: "123456",
        },
      };
      jest.spyOn(authServices, "login").mockResolvedValue(resolvedValue);
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await authController.login(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(resolvedValue);
    });
    it("should return 400 and error message", async () => {
      const rejectedValue = "";
      const mockReq = {
        body: {
          email: "poosarlagaurav@gmail.com",
          password: "123456",
        },
      };
      jest.spyOn(authServices, "login").mockRejectedValue(rejectedValue);
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await authController.login(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalled();
    });
  });
  describe("validate", () => {
    it("should return 200 and user object", async () => {
      const resolvedValue = true;
      const mockReq = {
        headers: {
          authorization: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhdXJhdkBtY2tpbnNleS5jb20iLCJ0aW1lc3RhbXAiOjE2NzgyOTE3NjY1ODEsImlhdCI6MTY3ODI5MTc2Nn0.389BGTNFs4r-TVJ7qd6KAvFP80LDVRpVjfBBnp0rhPE",
          },
        },
      };
      jest.spyOn(authServices, "validate").mockResolvedValue(resolvedValue);
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await authController.validate(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(resolvedValue);
    });
    it("should return 400 and error message", async () => {
      const rejectedValue = "";
      const mockReq = {
        headers: {
          authorization: {
            token: "",
          },
        },
      };
      jest.spyOn(authServices, "validate").mockRejectedValue(rejectedValue);
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await authController.validate(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalled();
    });
  });
});
