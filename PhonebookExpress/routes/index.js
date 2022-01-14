var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {title: "Phonebook v2.0"});
});

// Global variables
var currentContactId = 1;
var contacts = []; // {id, firstName, secondName, telephone}

// Get contacts request handler that uses query string /getContacts/?term=...
router.get("/api/getContacts", function (req, res) {
    var term = (req.query.term || "").toLowerCase();

    var result = term.length === 0 ? contacts : contacts.filter(function (contact) {
        return contact.firstName.toLowerCase().includes(term)
            || contact.lastName.toLowerCase().includes(term)
            || contact.telephone.toLowerCase().includes(term);
    });

    res.send(result);
});

// Add contact request handler
router.post("/api/addContact", function (req, res) {
    var request = req.body;

    // Check if first name is provided
    if (!request.firstName) {
        res.send({
            success: false,
            code: 1,
            message: "First name is obligatory"
        });

        return;
    }

    // Check if last name is provided
    if (!request.lastName) {
        res.send({
            success: false,
            code: 2,
            message: "Last name is obligatory"
        });

        return;
    }

    // Check if telephone is provided
    if (!request.telephone) {
        res.send({
            success: false,
            code: 3,
            message: "Telephone is obligatory"
        });

        return;
    }

    // Check if telephone already exists
    if (contacts.some(function (contact) {
        return contact.telephone.toLowerCase() === request.telephone.toLowerCase();
    })) {
        res.send({
            success: false,
            code: 4,
            message: "Telephone already exists"
        });

        return;
    }

    var newContact = {
        id: currentContactId,
        checked: false,
        firstName: request.firstName,
        lastName: request.lastName,
        telephone: request.telephone
    };

    contacts.push(newContact);

    ++currentContactId;

    res.send({
        success: true,
        message: null
    });
});

// Delete contact request handler
router.post("/api/deleteContact", function (req, res) {
    contacts = contacts.filter(function (contact) {
        return contact.id !== req.body.id;
    });

    res.send({
        success: true,
        message: null
    });
});

module.exports = router;