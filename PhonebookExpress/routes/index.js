var express = require('express');
var router = express.Router();

// Global variables
var currentContactId = 1;
var contacts = []; // {id, firstName, secondName, telephone}

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {title: "Express"});
});

// Get contacts request handler that uses query string /getContacts/?term=...
router.get("/api/getContacts", function (req, res) {
    var term = (req.query.term || "").toLowerCase();

    var result = term.length === 0 ? contacts : contacts.filter(function (contact) {
        return contact.firstName.toLowerCase().includes(term) ||
            contact.lastName.toLowerCase().includes(term) ||
            contact.telephone.toLowerCase().includes(term);
    });

    res.send(result);
});

// Add contact request handler
router.post("/api/addContact", function (req, res) {
    var requestedData = req.body;

    // Check if first name is provided
    if (!requestedData.firstName) {
        res.send({
            success: false,
            message: "First name is obligatory"
        });

        return;
    }

    // Check if last name is provided
    if (!requestedData.lastName) {
        res.send({
            success: false,
            message: "Last name is obligatory"
        });

        return;
    }

    // Check if telephone is provided
    if (!requestedData.telephone) {
        res.send({
            success: false,
            message: "Telephone is obligatory"
        });

        return;
    }

    // Check if telephone already exists
    if (contacts.some(function (contact) {
        return contact.data.telephone.toLowerCase() === requestedData.telephone.toLowerCase();
    })) {
        res.send({
            success: false,
            message: "Telephone already exists"
        });

        return;
    }

    // var newContact = {
    //     id: currentContactId,
    //     firstName: requestedData.firstName,
    //     lastName: requestedData.lastName,
    //     telephone: requestedData.telephone,
    // };

    contacts.push({
        id: currentContactId,
        firstName: requestedData.firstName,
        lastName: requestedData.lastName,
        telephone: requestedData.telephone
    });

    currentContactId = currentContactId + 1;

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
