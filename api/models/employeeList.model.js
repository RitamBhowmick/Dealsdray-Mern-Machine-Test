const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    image: {
        type: String
    },
    course : {
        type : String
    },
});

const EmployeeList = mongoose.model('EmployeeList1', EmployeeSchema);

module.exports = EmployeeList;