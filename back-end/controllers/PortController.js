const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const PortServices = require("../services/PortServices");

async function connectToDB() {
    await mongoose.connect(process.env.DB_URI);
    console.log(`${DateServices.getTimeCurrent()} Connected port controller to database successfully! ^-^`);
}

connectToDB();

app.use(express.json());

class PortController {
    static async addPort(req, res) {
        try {
            const NewPort = await PortServices.createPort(req.body);
            return res.status(201).json(NewPort);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add port! Error: ${err}`);
        }
    }

    static async getPorts(req, res) {
        try {
            const PortsList = await PortServices.readPorts();
            return res.status(200).json(PortsList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get ports list! Error: ${err}`);
        }
    }

    static async getPortByID(req, res) {
        try {
            const PortTarget = await PortServices.readPortByID(req.params.id);
            return res.status(200).json(PortTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get port by ID! Error: ${err}`);
        }
    }

    static async setPort(req, res) {
        try {
            const PortTarget = await PortServices.updatePort(req.params.id, req.body);
            return res.status(200).json(PortTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set port! Error: ${err}`);
        }
    }

    static async removePort(req, res) {
        try {
            const PortRemoved = await PortServices.deletePort(req.params.id);
            return res.status(200).json(PortRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove port! Error: ${err}`);
        }
    }
}

module.exports = PortController;