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
      done();
    });
  });
  // login page
  describe("POST /login", () => {
    it("should return token", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .set("content-type", "application/json")
        .send({ username: "moh@email.com", password: "moh123123" })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("token");
          done();
        });
    });
    it("should exception validation data", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .set("content-type", "application/json")
        .send({username: "", password: "" })
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("message");
            res.body.should.have.property("errors");
            res.body.errors.should.to.be.a("array");
            done();
        })
    });
    it("should exception username validation data", (done) => {
        chai
          .request(app)
          .post("/users/login")
          .set("content-type", "application/json")
          .send({username: "emailemail123", password: "ksjdk" })
          .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property("message");
              res.body.should.have.property("errors");
              res.body.errors.should.to.be.a("array");
              done();
          })
      });
  });
});
