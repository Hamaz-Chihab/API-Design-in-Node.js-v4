import * as user from "../user";

// mock Prisma Client, this means you get the benefits of being able to use your schema (type-safety), without having to make actual calls to your database when your tests are run.
describe("user handler", () => {
  it("should creat a new user", async () => {
    const req = { body: { userName: "hello lhech ", password: "password " } };
    const res = {
      json({ token, message }) {
        expect(token).toBeTruthy();
        expect(message).toBe("a user has created succesfully");
      },
    };
    await user.createNewUser(req, res, () => {});
  });

  it("should signin a valid user", async () => {
    const req = {
      body: {
        userName: "helloworld@gmail.com",
        // password: "helloworld",
      },
    };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };

    await user.signin(req, res, () => {});
  });

  // it("should return 401 for invalid credentials", async () => {
  //   const req = { body: { username: "unknown", password: "wrong_password" } };
  //   const res = { json: jest.fn(), status: jest.fn() };

  //   await user.signin(req, res, () => {});

  //   expect(res.status).toHaveBeenCalledWith(401); // Unauthorized status
  // });
});
