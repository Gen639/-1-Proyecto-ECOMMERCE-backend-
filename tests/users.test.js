const request = require("supertest");
const app = require("../main.js");
const { User } = require("../models/index.js");

describe("testing/users", () => {
  const user = {
    name: "Username",
    email: "test@example.com",
    password: "123456",
    role: "user",
    confirmed: false,
  };
  afterAll(() => {
    return User.destroy({ where: {}, truncate: true });
  });
  test("Create a user", async () => {
    const res = await request(app).post("/users").send(user).expect(201);

    const sendUser = {
      ...user,
      id: res.body.user.id,
      password: res.body.user.password,
      createdAt: res.body.user.createdAt,
      updatedAt: res.body.user.updatedAt,
    };
    const newUser = res.body.user;
    expect(newUser).toEqual(sendUser);
  });
});
