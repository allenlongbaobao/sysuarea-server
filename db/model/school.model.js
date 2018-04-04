const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let school = {
	name: String,
	// location: {},   地理位置信息
	introduction: String,
}

let School = new Schema(school);
Mongoose.model('school', School);
