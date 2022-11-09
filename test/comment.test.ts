import chai, { expect } from "chai";
import chaiHttpRequest from "chai-http";
import app from "../src/app";
import mongoose from "mongoose";
import dotenv from "dotenv";

chai.should();

chai.use(chaiHttpRequest);

describe("test comments", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaDBAZ21haWwuY29tIiwiX2lkIjoiNjM2OTA1ZTI3NjRhYWM1OWYwNTEyZjIxIiwiaWF0IjoxNjY3OTc4NDk3LCJleHAiOjE2NjgwNjQ4OTd9.PSJvZTi0lt92r31488I4ZzHCdBhoIiCN0iIpJ5DjXMc";
  beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/blogdeal");
    dotenv.config({ path: "./.env" });
    done();
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
        .send({ post: "6368fe9ce371a6c75fae3b6e", body: "body" })
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
        .send({ post: "6368fe9ce371a6c75fae3b6d", body: "body" })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("data");
          res.body.data.should.to.be.a("array");
          done();
        });
    });
  });
});
