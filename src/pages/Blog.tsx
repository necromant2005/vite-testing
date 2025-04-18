import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './pages.css';

interface BlogPost {
  title: string;
  date: string;
  author: string;
  category: string;
  content: string;
  slug: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const [welcomePost, bakingTipsPost, springSpecialPost] = await Promise.all([
          fetch('/src/data/blog/welcome-to-our-blog.md').then(res => res.text()),
          fetch('/src/data/blog/baking-tips.md').then(res => res.text()),
          fetch('/src/data/blog/spring-special.md').then(res => res.text())
        ]);

        const parseMarkdown = (content: string) => {
          const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
          if (!frontMatterMatch) return null;
          
          const [, frontMatter, markdownContent] = frontMatterMatch;
          const data = frontMatter.split('\n').reduce((acc, line) => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
              acc[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
            }
            return acc;
          }, {} as Record<string, string>);

          return {
            data,
            content: markdownContent
          };
        };

        const processedPosts = [
          parseMarkdown(welcomePost),
          parseMarkdown(bakingTipsPost),
          parseMarkdown(springSpecialPost)
        ].filter(Boolean).map((post, index) => ({
          title: post!.data.title,
          date: post!.data.date,
          author: post!.data.author,
          category: post!.data.category,
          content: post!.content,
          slug: `post-${index}`
        }));

        setPosts(processedPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Our Blog</h1>
      <p className="text-center text-muted mb-5">Latest updates, recipes, and baking tips</p>

      {selectedPost ? (
        <div className="blog-post">
          <button 
            className="btn btn-outline-secondary mb-4"
            onClick={() => setSelectedPost(null)}
          >
            ← Back to Blog
          </button>
          <article className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title">{selectedPost.title}</h2>
              <div className="text-muted mb-3">
                <small>
                  By {selectedPost.author} | {new Date(selectedPost.date).toLocaleDateString()} | {selectedPost.category}
                </small>
              </div>
              <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
            </div>
          </article>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {posts.map((post) => (
            <div key={post.slug} className="col">
              <div 
                className="card h-100 shadow-sm cursor-pointer"
                onClick={() => setSelectedPost(post)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body">
                  <h3 className="card-title h5">{post.title}</h3>
                  <div className="text-muted mb-2">
                    <small>
                      By {post.author} | {new Date(post.date).toLocaleDateString()}
                    </small>
                  </div>
                  <p className="card-text text-muted">{post.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog; 