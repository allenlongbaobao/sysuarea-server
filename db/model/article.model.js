const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let article = {
	owner: {
	  uid: Schema.Types.ObjectId, // 用户ID
	  nickName: String
	},
	content: String,
	title: String,
	tag: Array, // 标签
	type: String, //类型
	createdAt: String, //创建时间
	view: Number,
	love: Number
	// 分享链接
}

let Article = new Schema(article);
Mongoose.model('article', Article);
