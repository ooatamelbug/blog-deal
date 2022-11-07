import chai, { expect } from "chai";
import chaiHttpRequest from "chai-http";
import app from "../src/app";
import mongoose from "mongoose";
import dotenv from "dotenv";

chai.should();

chai.use(chaiHttpRequest);

describe("test interaction", () => {
  beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/blogdeal");
    dotenv.config({ path: "./.env" });
    done();
  });
  describe("POST /interactions", () => {
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaDBAZ21haWwuY29tIiwiX2lkIjoiNjM2OTA1ZTI3NjRhYWM1OWYwNTEyZjIxIiwiaWF0IjoxNjY3ODI3MzE0LCJleHAiOjE2Njc5MTM3MTR9.EJSJ8x0Z9ClOBKBTCKribADwAghl25SeZFT178NIfEk`;
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
    it("should should return error 201", (done) => {
      chai
        .request(app)
        .post("/interactions")
        .set("Authorization", `Bearer ${token}`)
        .send({ post: "6368fe9ce371a6c75fae3b6d", type: "LIKE" })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("data");
          done();
        });
    });
  });
});
