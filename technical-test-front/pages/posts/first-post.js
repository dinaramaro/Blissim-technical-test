import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';

export default function FirstPost(allPostsData) {
  const allPostsDataArray = allPostsData.allPostsData;
  return (
    <div>
      <h1>
        <Link href="/boutique">
          <a>First Post</a>
        </Link>
      </h1>
      <h2>
        <Link href="/">
          <a>Back to Home!</a>
        </Link>
      </h2>
      <section>
        <h2>Blog</h2>
        <ul>
          {allPostsDataArray.map((post) => (
            <li key={post.id}>
              {post.title}
              <br />
              {post.id}
              <br />
              {post.date}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
