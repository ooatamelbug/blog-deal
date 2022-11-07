import chai, { expect } from "chai";
import chaiHttpRequest from "chai-http";
import app from "../src/app";
import mongoose from "mongoose";
// import Post from "../src/post/model/posts";
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
  describe("POST /posts", () => {
    it("should return error 401", (done) => {
      console.log("here 2");
      chai
        .request(app)
        .post("/posts")
        .set("Authorization", "")
        .send({ title: "title", body: "body" })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message");
          res.body.should.have.property("errors");
          res.body.errors[0].should.to.be.a("string");
          done();
        });
    });
    it("should return error 400 validation", (done) => {
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaEBnbWFpbC5jb20iLCJfaWQiOiI2MzY4YmM3ZDU0NGNiOGM2N2ZmOTUzOGEiLCJpYXQiOjE2Njc4MDgzODIsImV4cCI6MTY2Nzg5NDc4Mn0.-2U50A6Qlr3mMT1mGSTngm4InFvNS7dwJmOx1RyaIUE`;
      chai
        .request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "", body: "" })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.have.property("errors");
          res.body.errors.should.to.be.a("array");
          done();
        });
    });
    it("should return data", (done) => {
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaEBnbWFpbC5jb20iLCJfaWQiOiI2MzY4YmM3ZDU0NGNiOGM2N2ZmOTUzOGEiLCJpYXQiOjE2Njc4MDgzODIsImV4cCI6MTY2Nzg5NDc4Mn0.-2U50A6Qlr3mMT1mGSTngm4InFvNS7dwJmOx1RyaIUE`;

      chai
        .request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "title", body: "body" })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("data");
          res.body.data.should.to.be.a("array");
          done();
        });
    });
  });
});
