const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

let user = {
	nickName: String,
	email: String, 
	pass: String,
	trueName: String,
	birthday: String, // 生日
	createdAt: String, //创建账号时间
	avator: String, //头像
	wx_token: String,
	wb_token: String,
	type: String, // 'personal' | 'society' 账号类型：个人或者社团
	school: {
		//sid: Schema.Types.ObjectId,
		name: String,
		college: String,
		AdmissionYear: String
	}, // 学校
	society: Array,
	follower: Array,
	following: Array
}

let User = new Schema(user)
Mongoose.model('user', User)