const {Schema, model} = require('mongoose');

const componentSchema = Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    settings: Schema.Types.Mixed,
    size: {type: String, enum: ['SMALL', 'MEDIUM', 'LARGE'], default: 'SMALL'}
});

const dashboardSchema = Schema({
    name: {type: String, required: true},
    components: [componentSchema]
});

const Dashboard = model('Dashboard', dashboardSchema);

module.exports = Dashboard;
