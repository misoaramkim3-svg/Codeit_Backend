import { createCommentApi } from "@/api/comments-api";
import type { NewCommentType } from "@backend/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCommentMutation = (memoId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newComment: NewCommentType) =>
      createCommentApi(memoId, newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["memos", memoId, "comments"],
      });
    },
  });
};
