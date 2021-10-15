import { useEffect, useState } from 'react';
import { PostDetail } from './PostDetail';
import { usePosts, useNextPosts } from './reducers';
import { useQueryClient } from 'react-query';
import { fetchPosts } from './actions';

const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  useNextPosts(currentPage);

  // const queryClient = useQueryClient();
  // useEffect(() => {
  //   if (currentPage < maxPostPage) {
  //     const nextPage = currentPage + 1;
  //     queryClient.prefetchQuery(['posts', nextPage], () =>
  //       fetchPosts(nextPage)
  //     );
  //   }
  // }, [currentPage, queryClient]);

  // replace with useQuery
  const { data, isError, error, isLoading } = usePosts(currentPage);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError)
    return (
      <>
        <h3>Error</h3>
        <p>{error.toString()}</p>
      </>
    );
  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className='post-title'
            onClick={() => {
              setSelectedPost(post);
            }}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className='pages'>
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
