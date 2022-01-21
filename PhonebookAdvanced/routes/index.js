const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {title: "Phonebook on Vue"});
});

// Global variables
let currentContactId = 1;
let contacts = []; // {id, firstName, secondName, telephone}

// Get contacts request handler that uses query string /getContacts/?term=...
router.get("/api/getContacts", function (req, res) {
    const term = (req.query.term || "").toLowerCase();

    const result = term.length === 0 ? contacts : contacts.filter(function (contact) {
        return contact.firstName.toLowerCase().includes(term)
            || contact.lastName.toLowerCase().includes(term)
            || contact.telephone.toLowerCase().includes(term);
    });

    res.send(result);
});

// Add contact request handler
router.post("/api/addContact", function (req, res) {
    const request = req.body;

    // Check if first name is provided
    if (!request.firstName) {
        res.send({
            success: false,
            code: 1,
            message: "First name is required"
        });

        return;
    }

    // Check if last name is provided
    if (!request.lastName) {
        res.send({
            success: false,
            code: 2,
            message: "Last name is required"
        });

        return;
    }

    // Check if telephone is provided
    if (!request.telephone) {
        res.send({
            success: false,
            code: 3,
            message: "Telephone is required"
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

    const newContact = {
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
        return !req.body.ids.includes(contact.id);
    });

    res.send({
        success: true,
        message: null
    });
});

module.exports = router;