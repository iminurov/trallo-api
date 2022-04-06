import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';

@Injectable()
export class CommentsOwnerGuard implements CanActivate {
  constructor(private readonly commentService: CommentsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const commentId = request.params.id;
    const currentUserId = request.user.id;
    const comment = await this.commentService.findOne(
      { id: commentId },
      { select: ['userId'] },
    );

    if (!comment) {
      throw new NotFoundException();
    }

    return currentUserId === comment.userId;
  }
}
