import chai, { expect } from "chai";
import chaiHttpRequest from "chai-http";
import app from "../src/app";
import mongoose from "mongoose";
// import Post from "../src/post/model/posts";
import dotenv from "dotenv";

chai.should();

chai.use(chaiHttpRequest);

describe("test posts", () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaDBAZ21haWwuY29tIiwiX2lkIjoiNjM2OTA1ZTI3NjRhYWM1OWYwNTEyZjIxIiwiaWF0IjoxNjY3OTc4NDk3LCJleHAiOjE2NjgwNjQ4OTd9.PSJvZTi0lt92r31488I4ZzHCdBhoIiCN0iIpJ5DjXMc"
  beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/blogdeal");
    dotenv.config({ path: "./.env" });
    done();
  });
  // posts post
  describe("POST /posts", () => {
    it("should return error 401", (done) => {
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

  // get post
  describe("GET /posts", () => {
    it("should return error 401", (done) => {
      chai
        .request(app)
        .get("/posts/?page=1")
        .set("Authorization", "")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message");
          res.body.should.have.property("errors");
          res.body.errors[0].should.to.be.a("string");
          done();
        });
    });

    it("it get error", (done) => {
      chai
        .request(app)
        .get("/posts/?page=0")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          done();
        })
    })

    it("it get data", (done) => {
      chai
        .request(app)
        .get("/posts/?page=1")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("data");
          res.body.data.should.have.property("total");
          res.body.data.should.have.property("page");
          res.body.data.should.have.property("limit");
          res.body.data.should.have.property("totalPages");
          res.body.data.should.have.property("hasNextPage");
          res.body.data.should.have.property("hasPrevPage");
          res.body.data.should.have.property("data");
          res.body.data.data.should.to.be.a("array");
          done();
        });
    })
  })
});
