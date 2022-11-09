import chai, { expect } from "chai";
import chaiHttpRequest from "chai-http";
import app from "../src/app";
import mongoose from "mongoose";
import User from "../src/users/model/user";
import dotenv from "dotenv";

chai.should();

chai.use(chaiHttpRequest);

describe("test admin", () => {
  let token = "";
  beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/blogdeal");
    dotenv.config({ path: "./.env" });

    done();
  });
  // login page
  describe("POST /login", () => {
    it("should return token", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .set("content-type", "application/json")
        .send({ username: "admin@deal.com", password: "deal123" })
        .end((err, res) => {
          token = res.body.token;
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
        .send({ username: "", password: "" })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.have.property("errors");
          res.body.errors.should.to.be.a("array");
          done();
        });
    });
    it("should exception username validation data", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .set("content-type", "application/json")
        .send({ username: "emailemail123", password: "ksjdk" })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          res.body.should.have.property("errors");
          res.body.errors.should.to.be.a("array");
          done();
        });
    });
  });

  describe("GET /statistics", () => {
    it("should return error is not auth", (done) => {
      chai
        .request(app)
        .get("/admin/statistics")
        .set("content-type", "application/json")
        .set("Authorization", ``)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message");
          done();
        });
    });
    it("should return error is not admin", (done) => {
      chai
        .request(app)
        .get("/admin/statistics")
        .set("content-type", "application/json")
        .set("Authorization", `${token}d34r`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message");
          done();
        });
    });
    it("should return data", (done) => {
      console.log(token);
      chai
        .request(app)
        .get("/admin/statistics")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("data");
          res.body.data.should.have.property("total_comments");
          res.body.data.should.have.property("total_interaction_posts");
          res.body.data.should.have.property("total_interaction_comments");
          res.body.data.should.have.property("total_posts");
          res.body.data.should.have.property("total_approved_post");
          res.body.data.should.have.property("total_pending_post");
          res.body.data.should.have.property("total_rejected_post");
          done();
        });
    });
  });
});
