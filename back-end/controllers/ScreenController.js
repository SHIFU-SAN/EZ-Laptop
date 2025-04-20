const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const ScreenServices = require("../services/ScreenServices");

async function connectToDB() {
    await mongoose.connect(process.env.DB_URI);
    console.log(`${DateServices.getTimeCurrent()} Connected screen controller to database successfully! ^-^`);
}

connectToDB();

app.use(express.json());

class ScreenController {
    static async addScreen(req, res) {
        try {
            const NewScreen = await ScreenServices.createScreen(req.body);
            return res.status(201).json(NewScreen);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add screen! Error: ${err}`);
        }
    }

    static async getScreens(req, res) {
        try {
            const ScreensList = await ScreenServices.readScreens();
            return res.status(200).json(ScreensList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get screens list! Error: ${err}`);
        }
    }

    static async getScreenByID(req, res) {
        try {
            const ScreenTarget = await ScreenServices.readScreenByID(req.params.id);
            return res.status(200).json(ScreenTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get screen by ID! Error: ${err}`);
        }
    }

    static async setScreen(req, res) {
        try {
            const ScreenTarget = await ScreenServices.updateScreen(req.params.id, req.body);
            return res.status(200).json(ScreenTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set screen! Error: ${err}`);
        }
    }

    static async removeScreen(req, res) {
        try {
            const ScreenRemoved = await ScreenServices.deleteScreen(req.params.id);
            return res.status(200).json(ScreenRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove screen! Error: ${err}`);
        }
    }
}

module.exports = ScreenController;