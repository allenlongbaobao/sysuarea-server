const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

let comment = {
	commentUser: {
		uid: Schema.Types.ObjectId,
		name: String,
		avator: String
	}, // 评论人简要信息
	content: String, // 评论内容
	aid: Schema.Types.ObjectId, // 文章ID
	createAt: String, //评论时间
	love: Number
}

let Comment = new Schema(comment)
Mongoose.model('comment', Comment)
