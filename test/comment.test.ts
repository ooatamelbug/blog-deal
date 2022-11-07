import chai, { expect } from "chai";
import chaiHttpRequest from "chai-http";
import app from "../src/app";
import mongoose from "mongoose";
import dotenv from "dotenv";

chai.should();

chai.use(chaiHttpRequest);

describe("test posts", () => {
  beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/blogdeal");
    dotenv.config({ path: "./.env" });
    done();
  });
  // login page
  describe("POST /comments", () => {
    it("should return error 401", (done) => {
      console.log("here 2");
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
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaDBAZ21haWwuY29tIiwiX2lkIjoiNjM2OTA1ZTI3NjRhYWM1OWYwNTEyZjIxIiwiaWF0IjoxNjY3ODI3MzE0LCJleHAiOjE2Njc5MTM3MTR9.EJSJ8x0Z9ClOBKBTCKribADwAghl25SeZFT178NIfEk`;
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
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaDBAZ21haWwuY29tIiwiX2lkIjoiNjM2OTA1ZTI3NjRhYWM1OWYwNTEyZjIxIiwiaWF0IjoxNjY3ODI3MzE0LCJleHAiOjE2Njc5MTM3MTR9.EJSJ8x0Z9ClOBKBTCKribADwAghl25SeZFT178NIfEk`;

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
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaDBAZ21haWwuY29tIiwiX2lkIjoiNjM2OTA1ZTI3NjRhYWM1OWYwNTEyZjIxIiwiaWF0IjoxNjY3ODI3MzE0LCJleHAiOjE2Njc5MTM3MTR9.EJSJ8x0Z9ClOBKBTCKribADwAghl25SeZFT178NIfEk`;
  
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
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaDBAZ21haWwuY29tIiwiX2lkIjoiNjM2OTA1ZTI3NjRhYWM1OWYwNTEyZjIxIiwiaWF0IjoxNjY3ODI3MzE0LCJleHAiOjE2Njc5MTM3MTR9.EJSJ8x0Z9ClOBKBTCKribADwAghl25SeZFT178NIfEk`;

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
