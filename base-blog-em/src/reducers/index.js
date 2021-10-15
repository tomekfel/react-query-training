import { useQuery, useQueryClient } from 'react-query';
import * as actions from '../actions';

export const useComments = (postId) => {
  return useQuery([`comments`, postId], () => actions.fetchComments(postId), {
    staleTime: 20000,
  });
};

export const usePosts = (currentPage) => {
  return useQuery(
    ['posts', currentPage],
    () => actions.fetchPosts(currentPage),
    {
      staleTime: 20000,
      keepPreviousData: true,
    }
  );
};

export const useNextPosts = (currentPage) => {
  const queryClient = useQueryClient();

  if (currentPage < 10) {
    const nextPage = currentPage + 1;
    return queryClient.prefetchQuery(
      ['posts', nextPage],
      () => actions.fetchPosts(nextPage),
      {
        staleTime: 20000,
      }
    );
  }
};
