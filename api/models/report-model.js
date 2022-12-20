const mongoose = require('mongoose');


const reportSchema = new mongoose.Schema({
    reason: String,
    reporterId: String,
    postId: String,
    postedId: String

},
    {
        timestamps: true
    })

const ReportModel = mongoose.model('reports', reportSchema)
module.exports = ReportModel