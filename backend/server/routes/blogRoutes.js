const express = require('express')
const userCtrl = require('../controllers/userInfoController')
const blogCtrl = require('../controllers/blogController')

const router = express.Router()

router.route('/new/:userId')
    .post(userCtrl.requireSignin, blogCtrl.create)

router.route('/:agree')
    .post(blogCtrl.list)

router.route('/photo/:postId')
    .get(blogCtrl.photo)


router.route('/agree/:userId')
    .get(blogCtrl.listByUser)

router.route('/feed/:userId')
    .get(userCtrl.requireSignin, blogCtrl.listNewsFeed)

router.route('/blogUpdate')
    .put(blogCtrl.blogUpdate)

router.route('/:id/like').put(blogCtrl.like);
router.route('/:id/unlike').put(blogCtrl.unlike);

router.route('/:postId')
    .delete(blogCtrl.remove)
    .get(blogCtrl.blogOne)

router.param('userId', userCtrl.userByID)
router.param('postId', blogCtrl.postByID)

module.exports = router
