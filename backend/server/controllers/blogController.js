const Blog = require('../models/blogModel')
const errorHandler = require('../helpers/dbErrorHandler')
const formidable = require('formidable')
const fs = require('fs')

const create = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    console.log('fields:', files)
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      })
    }
    const ensureSingleValueFields = (fields) => {
      for (const key in fields) {
        if (Array.isArray(fields[key])) {
          fields[key] = fields[key][0];
        }
      }
    };
    ensureSingleValueFields(fields);
    let blog = new Blog(fields)
    blog.postedBy = req.profile
    if (files.photo) {
      blog.photo.data = fs.readFileSync(files.photo[0].filepath)
      blog.photo.contentType = files.photo[0].mimetype
    }
    try {
      let result = await blog.save()
      res.json(result)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const postByID = async (req, res, next, id) => {
  try {
    let blog = await Blog.findById(id).populate('postedBy', '_id userName').exec()
    if (!blog)
      return res.status('400').json({
        error: "blog not found"
      })
    req.post = blog
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve use post"
    })
  }
}

const list = async (req, res) => {
  const path = req.path.slice(1)
  try {
    let blogData = await Blog.find().populate('agree', 'path')
    res.json(blogData)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const blogOne = async (req, res) => {
  try {
    console.log("req", req.post)
    res.json(req.post)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listByUser = async (req, res) => {
  try {
    let blogs = await Blog.find({ postedBy: req.profile._id })
      .populate('energys.postedBy', '_id userName')
      .populate('postedBy', '_id userName')
      .sort('-created')
      .exec()
    res.json(blogs)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listNewsFeed = async (req, res) => {
  let following = req.profile.following
  following.push(req.profile._id)
  try {
    let blogs = await Blog.find({ postedBy: { $in: req.profile.following } })
      .populate('energys.postedBy', '_id userName')
      .populate('postedBy', '_id userName')
      .sort('-created')
      .exec()
    res.json(blogs)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  let blog = req.post
  console.log(blog)
  try {
    const deletedblog = await Blog.deleteOne({ _id: blog._id });
    if (deletedblog.deletedCount === 1) {
      // Fetch all remaining blog posts
      const allBlogs = await Blog.find();
      res.status(200).json({ message: 'Blog post deleted successfully', blogs: allBlogs });
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const photo = (req, res, next) => {
  res.set("Content-Type", req.post.photo.contentType)
  return res.send(req.post.photo.data)
}

const blogUpdate = async (req, res) => {
  try {
    let blog = await Blog.findByIdAndUpdate(req.body.blogId, { agree: true }, { new: true })
    res.json(blog)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


const isPoster = (req, res, next) => {
  let isPoster = req.post && req.auth && req.post.postedBy._id === req.auth._id
  if (!isPoster) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

const like = async (req, res) => {
  const like = await Blog.findById(req.params.id);
  if (like) {
    like.like = like.like + 1;
    const updateLike = await like.save();
    res.status(200).json({
      like: updateLike.like
    })
  } else {
    res.status(400).json({ error: "like not found" });
  }

}

const unlike = async (req, res) => {
  const unlike = await Blog.findById(req.params.id);
  if (unlike) {
    unlike.unlike = unlike.unlike + 1;
    const updateunLike = await unlike.save();
    res.status(200).json({
      unlike: updateunLike.unlike
    })
  } else {
    res.status(400).json({ error: "like not found" });
  }

}

module.exports = {
  listByUser,
  listNewsFeed,
  blogOne,
  list,
  create,
  postByID,
  remove,
  photo,
  blogUpdate,
  isPoster,
  like,
  unlike
}
