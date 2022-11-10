import chai, { expect } from "chai";
import chaiHttpRequest from "chai-http";
import app from "../src/app";
import mongoose from "mongoose";
import dotenv from "dotenv";

chai.should();

chai.use(chaiHttpRequest);

describe("test comments", () => {
  let token = "";
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vc0BnbWFpbC5jb20iLCJfaWQiOiI2MzZjYmVmYWRhZDI0ZWFhOTM0ODc2MjEiLCJpYXQiOjE2NjgwNzExNjMsImV4cCI6MTY2ODE1NzU2M30.n3ptmeiLrNPJCZIHpWDF3uRKHmPgCoICiI_4YKeaFHA";
  beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/blogdeal");
    dotenv.config({ path: "./.env" });
    done();
  });

  before((done) => {
    chai
      .request(app)
      .post("/users/login")
      .set({ username: "mod@gmail.com", password: "moh123" })
      .end((err, res) => {
        // token = res.body.token;
        done();
      });
  });
  // login page
  describe("POST /comments", () => {
    it("should return error 401", (done) => {
      chai
        .request(app)
        .post("/comments")
        .set("Authorization", "")
        .send({ post: "asdw2rfr5f5", body: "body" })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message");
          res.body.should.have.property("errors");
          res.body.errors[0].should.to.be.a("string");
          done();
        });
    });
    it("should return error 400 validation", (done) => {
      chai
        .request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ post: "", body: "" })
        .end((err, res) => {
          console.log(res.status);
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.have.property("errors");
          res.body.errors.should.to.be.a("array");
          done();
        });
    });
    it("should return error not id", (done) => {
      chai
        .request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ post: "ckjrur8uhv", body: "body" })
        .end((err, res) => {
          console.log(res.status);
          res.should.have.status(500);
          res.body.should.have.property("message");
          done();
        });
    });
    it("should return error not found", (done) => {
      chai
        .request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ post: "6368fe9ce371a6c75fae3b63", body: "body" })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          res.body.should.have.property("errors");
          res.body.errors.should.to.be.a("array");
          done();
        });
    });
    it("should return error not found NOT APPROVED", (done) => {
      chai
        .request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ post: "6368fe9ce371a6c75fae3b6d", body: "body" })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          res.body.should.have.property("errors");
          res.body.errors.should.to.be.a("array");
          done();
        });
    });

    it("should return data", (done) => {
      chai
        .request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ post: "6369108fc9d5bd7ddcb9c830", body: "body" })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("data");
          res.body.data.should.to.be.a("array");
          done();
        });
    });
  });
});
