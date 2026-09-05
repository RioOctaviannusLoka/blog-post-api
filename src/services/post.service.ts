import Post from '../models/Post';

export const getPosts = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  return await Post.findAndCountAll({
    limit,
    offset,
    order: [['created_at', 'DESC']],
  });
};

export const getPostById = async (id: number) => {
  return await Post.findByPk(id);
};

export const createPost = async (
  data: { title: string; content: string }
) => {
  return await Post.create(data);
};

export const updatePost = async (
  id: number,
  data: { title?: string; content?: string }
) => {
  const post = await Post.findByPk(id);
  if (!post) return null;
  return await post.update(data);
};

export const deletePost = async (id: number) => {
  const post = await Post.findByPk(id);
  if (!post) return null;
  await post.destroy();
  return true;
};
