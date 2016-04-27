var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserStorySchema = new Schema ({
	creator: { type: Schema.Types.ObjectId, ref: 'User'},
	cotent: String,
	created: { type: Date}
});

module.exports = mongoose.model('Story', UserStorySchema);