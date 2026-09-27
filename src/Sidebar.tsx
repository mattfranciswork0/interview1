const Sidebar = ({ onClickSelectedPost, posts }) => {
  console.log(posts);
  return (
    <div>
      {posts.map((post) => {
        const sumReactions = post.reactions.likes + post.reactions.dislikes;

        return (
          <div onClick={() => onClickSelectedPost(post.id)}>
            <h3>{post.title}</h3>
            <div>{sumReactions} reactions</div>
            {post.tags.map((tag) => (
              <span key={tag}>{tag} </span>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
