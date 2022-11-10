import chai, { expect } from "chai";
import chaiHttpRequest from "chai-http";
import app from "../src/app";
import mongoose from "mongoose";
// import Post from "../src/post/model/posts";
import dotenv from "dotenv";

chai.should();

chai.use(chaiHttpRequest);

describe("test posts", () => {
  let token = "";
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vc0BnbWFpbC5jb20iLCJfaWQiOiI2MzZjYmVmYWRhZDI0ZWFhOTM0ODc2MjEiLCJpYXQiOjE2NjgwNzExNjMsImV4cCI6MTY2ODE1NzU2M30.n3ptmeiLrNPJCZIHpWDF3uRKHmPgCoICiI_4YKeaFHA";
  
  let adminToken = "";
  adminToken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGRlYWwuY29tIiwiX2lkIjoiNjM2YmYxMmNhYTUwYTU4MjUwZTcxZTVjIiwiaWF0IjoxNjY4MDcxOTI2LCJleHAiOjE2NjgxNTgzMjZ9.z-773djFET17JniMEsTMOsb8HwxxUvQHLkz5ptJUYGk";

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
  before((done) => {
    chai
      .request(app)
      .post("/users/login")
      .set({ username: "admin@deal.com", password: "deal123" })
      .end((err, res) => {
        // adminToken = res.body.token;
        // console.log(adminToken);
        done();
      });
  })
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

    it("it get error page out", (done) => {
      chai
        .request(app)
        .get("/posts/?page=0")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          done();
        });
    });

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
    });
  });

  describe("PATCH /posts/:id", () => {
    it("should return error 401", (done) => {
      chai
        .request(app)
        .patch("/posts/6369108fc9d5bd7ddcb9c830")
        .set("Authorization", "")
        .send({ status: ""})
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message");
          res.body.should.have.property("errors");
          res.body.errors[0].should.to.be.a("string");
          done();
        });
    });

    it("should return error 401 not admin", (done) => {
      chai
        .request(app)
        .patch("/posts/6368fe67e371a6c75fae3b6a")
        .set("Authorization", `Bearer ${token}`)
        .send({ status: "" })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message");
          res.body.should.have.property("errors");
          res.body.errors.should.to.be.a("array");
          done();
        });
    });

    it("should return error 400 validation", (done) => {
      chai
        .request(app)
        .patch("/posts/6368fe67e371a6c75fae3b6a")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ status: "" })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.have.property("errors");
          res.body.errors.should.to.be.a("array");
          done();
        });
    });

    it("should return error 404 not found", (done) => {
      chai
        .request(app)
        .patch("/posts/6368fe67e371a6c75fae3b63")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ status: "APPROVED" })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          done();
        });
    });

    it("should return error in status type", (done) => {
      chai
        .request(app)
        .patch("/posts/636910fa658c824709d288a2")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ status: "APPROV" })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          done();
        });
    });

    it("should return update", (done) => {
      chai
        .request(app)
        .patch("/posts/636910fa658c824709d288a2")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ status: "APPROVED" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("data");
          res.body.data.should.have.property("updated");
          done();
        });
    });
  });
});
