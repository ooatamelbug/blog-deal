import chai, { expect } from "chai";
import chaiHttpRequest from "chai-http";
import app from "../src/app";
import mongoose from "mongoose";
import dotenv from "dotenv";

chai.should();

chai.use(chaiHttpRequest);

describe("test interaction", () => {
  let token = "";
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vc0BnbWFpbC5jb20iLCJfaWQiOiI2MzZjYmVmYWRhZDI0ZWFhOTM0ODc2MjEiLCJpYXQiOjE2NjgwNzExNjMsImV4cCI6MTY2ODE1NzU2M30.n3ptmeiLrNPJCZIHpWDF3uRKHmPgCoICiI_4YKeaFHA";
  beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/blogdeal");
    dotenv.config({ path: "./.env" });
    chai
      .request(app)
      .post("/users/login")
      .set({ username: "mod@gmail.com", password: "moh123" })
      .end((err, res) => {
        // token = res.body.token;
      });
    done();
  });
  describe("POST /interactions", () => {
    it("should should return error 401", (done) => {
      chai
        .request(app)
        .post("/interactions")
        .set("Authorization", "")
        .send({ post: "", type: "" })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message");
          done();
        });
    });
    it("should should return error 400", (done) => {
      chai
        .request(app)
        .post("/interactions")
        .set("Authorization", `Bearer ${token}`)
        .send({ post: "", type: "" })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          done();
        });
    });
    it("should should return error 404", (done) => {
      chai
        .request(app)
        .post("/interactions")
        .set("Authorization", `Bearer ${token}`)
        .send({ post: "6368fe9ce371a6c75fae3b6e", type: "LIKE" })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          res.body.should.have.property("errors");
          done();
        });
    });
    it("should should return error 404 status", (done) => {
      chai
        .request(app)
        .post("/interactions")
        .set("Authorization", `Bearer ${token}`)
        .send({ post: "6368fe9ce371a6c75fae3b6d", type: "LIKE" })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          done();
        });
    });
    it("should should return 201", (done) => {
      chai
        .request(app)
        .post("/interactions")
        .set("Authorization", `Bearer ${token}`)
        .send({ post: "6369108fc9d5bd7ddcb9c830", type: "LIKE" })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("data");
          done();
        });
    });
    
  });
});
