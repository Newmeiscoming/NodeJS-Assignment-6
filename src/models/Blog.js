const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    topic:{type:String,required:true},
    description:{required:true,type:String},
    posted_at:{type:Date,default:Date.now},
    posted_by:{type:String,required:true}

},{
    versionKey:false
});

const Blog = new mongooose.model('blogs', blogSchema);

module.exports = Blog;