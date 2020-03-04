const express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render('form.twig');
});


router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});


router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render('list.twig', {
                list : docs
            });
        }
    });
});


function insertRecord(req, res) {
    var employee = new Employee();

    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;

    employee.save((err, doc) => {
        if (!err) {
            res.redirect('form/list');
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render('form.twig', {
                    employee: req.body
                });
            } else {
                console.log('Error : ' + err);
            }
        }
    });
}

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName' :
                body['fullNameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }

};

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id}, req.body, { new:true }, (err, doc) => {
        if (!err) { 
            res.redirect('form/list'); 
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render('form.twig', {
                    employee: req.body
                });
            } else {
                console.log('Error : ' + err);
            }
        }
    });
};

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('form.twig', {
                employee: doc
            });
        }
    });

});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/form/list');
        } else {
            console.log('Error : ' + err);
        }
    });
});


module.exports = router;
