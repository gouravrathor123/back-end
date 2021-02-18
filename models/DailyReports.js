const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dailyreportSchema = new Schema({
    report: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    owner_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
}, {
    timestamps: true
});

const DailyReport = mongoose.model('DailyReport', dailyreportSchema);

module.exports = DailyReport;