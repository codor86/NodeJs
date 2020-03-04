const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB', { useNewUrlParser: true}, (err) => {
    if (!err) {
        console.log('MongoDB Connection succes');
    } else {
        console.log(err);
    }
});

require('./employee.model');
