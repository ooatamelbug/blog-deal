import { Response, ReturnValue } from "./../shared/response";
import { PostInputDTO, ShowedPostParamDTO } from "./dto/posts.dto";
import Post, { IPostModel } from "./model/posts";
import { Model } from "mongoose";

class PostsService {
  private readonly postModel: Model<IPostModel>;
  constructor(InjectModel: Model<IPostModel>) {
    this.postModel = InjectModel;
  }

  public async createPost(inputDTO: PostInputDTO): Promise<ReturnValue> {
    let statusCode: number = 200;
    let response: Response = {};
    try {
      const newPost = await this.postModel.create({
        title: inputDTO.title,
        body: inputDTO.body,
        createdby: inputDTO.createdby,
        status: "PENDING",
      });
      const post = await newPost.save();
      statusCode = 201;
      response.data = [post];
    } catch (error) {
      statusCode = 500;
      response.message = error.message;
    }
    return { statusCode, response };
  }

  public async getPosts(showedParam: ShowedPostParamDTO): Promise<ReturnValue> {
    let statusCode: number = 200;
    let response: Response = {};
    try {
      let filter = <PostInputDTO>{};
      filter.status = showedParam.role === "USER" ? "APPROVED" : "";
      const postsTotal = await this.postModel.find(filter).countDocuments();
      let skip =
        Number(showedParam.pagenate) === 1
          ? 0
          : (Number(showedParam.pagenate) - 1) * 10;
      if (
        postsTotal < skip ||
        Math.ceil(postsTotal / (Number(showedParam.limit) || 10)) <
          Number(showedParam.pagenate)
          ||
          Number(showedParam.pagenate) <= 0
      ) {
        statusCode = 404;
        response.message = "out of the range";
      } else {
        const posts = await this.postModel
          .aggregate([
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "users",
                localField: "createdby",
                foreignField: "_id",
                as: "createdby",
              },
            },
            {
              $unwind: "$createdby",
            },
            {
              $lookup: {
                from: "interactions",
                localField: "_id",
                foreignField: "post",
                pipeline: [
                  {
                    $group: {
                      _id: "$type",
                      count: {
                        $sum: 1,
                      },
                    },
                  },
                ],
                as: "interactions",
              },
            },
            {
              $project: { "createdby.password": 0 },
            },
          ])
          .sort({ createdAt: -1 })
          .limit(Number(showedParam.limit) || 10)
          .skip(skip);
        statusCode = 200;
        response.data = {
          data: posts,
          total: postsTotal,
          page: Number(showedParam.pagenate),
          limit: Number(showedParam.limit) || 10,
          totalPages: Math.ceil(postsTotal / (Number(showedParam.limit) || 10)),
          hasNextPage: postsTotal > (skip || 10),
          hasPrevPage: Number(showedParam.pagenate) >= 2,
        };
      }
    } catch (error) {
      statusCode = 500;
      response.message = error.message;
    }
    return { statusCode, response };
  }
}

export default PostsService;
