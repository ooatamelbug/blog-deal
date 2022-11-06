import chai, { expect } from "chai";
import chaiHttpRequest from "chai-http";
import app from "../src/app";
import mongoose from "mongoose";
import User from "../src/users/model/user";
import dotenv from "dotenv";

chai.should();

chai.use(chaiHttpRequest);

describe("test login", () => {
  beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/blogdeal");
    dotenv.config({ path: "./.env" });

    User.remove({}, (err) => {
      console.log(err);
      console.log("done");
      done();
    });
  });
  // login page
  describe("Get /login", () => {
    it("should return token", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .set("content-type", "application/json")
        .send({ username: "moh@email.com", password: "moh123123" })
        .end((err, res) => {
        //   console.log(res.status);
        //   console.log(res.body);
          res.should.have.status(201);
          res.body.should.have.property("token");
          done();
        });
    });
  });
});
