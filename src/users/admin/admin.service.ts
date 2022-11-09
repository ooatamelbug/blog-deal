import { Response, ReturnValue } from "../../shared/response";
import { Model } from "mongoose";
import CommentsService from "../../comment/comments.service";
import InteractionService from "../../interaction/interaction.service";
import PostsService from "../../post/posts.service";

interface countDataShap {
  _id: string;
  count: number;
}

class AdminService {
  private readonly commentService: CommentsService;
  private readonly postService: PostsService;
  private readonly interactionService: InteractionService;
  constructor(
    InjectPostService: PostsService,
    InjectInteractionService: InteractionService,
    InjectCommentService: CommentsService
  ) {
    this.commentService = InjectCommentService;
    this.postService = InjectPostService;
    this.interactionService = InjectInteractionService;
  }

  private getStaticData(data: [], status: string): number {
    if (data.length > 0) {
      const filterData = <countDataShap[]>(
        data.filter((field: any) => field._id == status)
      );
      return Number(filterData[0]?.count);
    } else {
      return 0;
    }
  }

  public async statistics(): Promise<ReturnValue> {
    let statusCode: number = 200;
    let response: Response = {};
    try {
      const commentData = await this.commentService.getCommentsStatic();
      const postData = await this.postService.getPostsStatic();
      const interactionData =
        await this.interactionService.getInteractionsStatic();
        let init = 0;
      const countPost = postData.response?.data.TYPE.reduce(
        (previousValue: any, {count}: any) => {
          return previousValue + count;
        },
        init
      );
      response.data = {
        total_comments:
          interactionData.response?.data.post.length > 0
            ? commentData.response?.data[0].count
            : 0,
        total_interaction_posts:
          interactionData.response?.data.post.length > 0
            ? interactionData.response?.data.post[0].count
            : 0,
        total_interaction_comments:
          interactionData.response?.data.comment > 0
            ? interactionData.response?.data.comment[0].count
            : 0,
        total_posts: countPost,
        total_approved_post:
          this.getStaticData(postData.response?.data.TYPE, "APPROVED") || 0,
        total_pending_post:
          this.getStaticData(postData.response?.data.TYPE, "PENDING") || 0,
        total_rejected_post:
          this.getStaticData(postData.response?.data.TYPE, "REJECTED") || 0,
      };
    } catch (error) {
      statusCode = 500;
      response.message = error.message;
    }
    return { statusCode, response };
  }
}

export default AdminService;
