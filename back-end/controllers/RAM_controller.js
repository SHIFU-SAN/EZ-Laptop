const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const RAM_services = require("../services/RAM_services");

async function connectToDB() {
    await mongoose.connect(process.env.DB_URI);
    console.log(`${DateServices.getTimeCurrent()} Connected ram controller to database successfully! ^-^`);
}

connectToDB();

app.use(express.json());

class RAM_controller {
    static async addRAM(req, res) {
        try {
            const NewRAM = await RAM_services.createRAM(req.body);
            return res.status(201).json(NewRAM);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add RAM! Error: ${err}`);
        }
    }

    static async getRAMs(req, res) {
        try {
            const RAMsList = await RAM_services.readRAMs();
            return res.status(200).json(RAMsList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get RAMs list! Error: ${err}`);
        }
    }

    static async getRAM_byID(req, res) {
        try {
            const RAM_target = await RAM_services.readRAMByID(req.params.id);
            return res.status(200).json(RAM_target);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get RAM by ID! Error: ${err}`);
        }
    }

    static async setRAM(req, res) {
        try {
            const RAM_target = await RAM_services.updateRAM(req.params.id, req.body);
            return res.status(200).json(RAM_target);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set RAM! Error: ${err}`);
        }
    }

    static async addImage(req, res) {
        try {
            const NewImage = await RAM_services.createImage(req.params.id, req.body);
            return res.status(201).json(NewImage);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add image to RAM! Error: ${err}`);
        }
    }

    static async addMoreImages(req, res) {
        try {
            const RAM_ID = req.params.id;
            const NewImages = req.body.map(async image => await RAM_services.createImage(RAM_ID, image));
            return res.status(201).json(NewImages);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add more image to RAM! Error: ${err}`);
        }
    }

    static async removeImage(req, res) {
        try {
            const ImageRemoved = await RAM_services.deleteImage(req.params.id, req.params.image_id);
            return res.status(200).json(ImageRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove image to RAM! Error: ${err}`);
        }
    }

    static async removeImages(req, res) {
        try {
            const ImagesRemoved = await RAM_services.deleteImage(req.params.id);
            return res.status(200).json(ImagesRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove images to RAM! Error: ${err}`);
        }
    }

    static async removeRAM(req, res) {
        try {
            const RAM_removed = await RAM_services.deleteRAM(req.params.id);
            return res.status(200).json(RAM_removed);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove RAM! Error: ${err}`);
        }
    }
}

module.exports = RAM_controller;