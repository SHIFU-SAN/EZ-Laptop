const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const AdapterServices = require("../services/AdapterServices");
const DateServics = require("../services/DateServices");

async function connectToDB() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log(`${DateServics.getTimeCurrent()} Connected adapter controller to database successfully! ^-^`);
    } catch (err) {
        console.error(`${DateServics.getTimeCurrent()} Adapter controller connection to database failed! Error: ${err}`);
    }
}

connectToDB();

app.use(express.json());

class AdapterController {
    static async addAdapter(req, res) {
        try {
            const NewAdapter = await AdapterServices.createAdapter(req.body);
            return res.status(201).json(NewAdapter);
        } catch (err) {
            res.status(400);
            console.error(`${DateServics.getTimeCurrent()} Can't add adapter! Error: ${err}`)
        }
    }

    static async getAdaptersList(req, res) {
        try {
            const AdaptersList = await AdapterServices.readAdapters();
            return res.status(200).json(AdaptersList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServics.getTimeCurrent()} Can't get adapters list! Error: ${err}`)
        }
    }

    static async getAdapterByID(req, res) {
        try {
            const AdapterTarget = await AdapterServices.readAdapterByID(req.params.id);
            return res.status(200).json(AdapterTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServics.getTimeCurrent()} Can't get adapter by ID! Error: ${err}`)
        }
    }

    static async setAdapter(req, res) {
        try {
            const AdapterTarget = await AdapterServices.updateAdapter(req.params.id, req.body);
            return res.status(200).json(AdapterTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServics.getTimeCurrent()} Can't set adapter! Error: ${err}`)
        }
    }

    static async addImage(req, res) {
        try {
            const NewAdapterImage = await AdapterServices.createImage(req.params.id, req.body);
            return res.status(201).json(NewAdapterImage)
        } catch (err) {
            res.status(400);
            console.error(`${DateServics.getTimeCurrent()} Can't add image adapter! Error: ${err}`)
        }
    }

    static async addMoreImages(req, res) {
        try {
            const AdapterID = req.params.id;
            const NewAdapterImages = req.body.map(async image => await AdapterServices.createImage(AdapterID, image));
            return res.status(201).json(NewAdapterImages);
        } catch (err) {
            res.status(400);
            console.error(`${DateServics.getTimeCurrent()} Can't add more image adapter! Error: ${err}`)
        }
    }

    static async removeImage(req, res) {
        try {
            const ImageRemoved = await AdapterServices.deleteImage(req.params.id, req.params.image_id);
            return res.status(200).json(ImageRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServics.getTimeCurrent()} Can't remove image adapter! Error: ${err}`)
        }
    }

    static async removeImages(req, res) {
        try {
            const ImagesRemoved = await AdapterServices.deleteImage(req.params.id);
            return res.status(200).json(ImagesRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServics.getTimeCurrent()} Can't remove images adapter! Error: ${err}`)
        }
    }

    static async addCompatibleLaptop(req, res) {
        try {
            const NewCompatibleLaptop = await AdapterServices.createCompatibleLaptop(req.params.id, req.body);
            return res.status(201).json(NewCompatibleLaptop)
        } catch (err) {
            res.status(400);
            console.error(`${DateServics.getTimeCurrent()} Can't add compatible laptop with adapter! Error: ${err}`)
        }
    }

    static async addMoreCompatibleLaptop(req, res) {
        try {
            const AdapterID = req.params.id;
            const NewCompatibleLaptops = req.body.map(async laptop => await AdapterServices.createCompatibleLaptop(AdapterID, laptop));
            return res.status(201).json(NewCompatibleLaptops);
        } catch (err) {
            res.status(400);
            console.error(`${DateServics.getTimeCurrent()} Can't add more compatible laptop with adapter! Error: ${err}`)
        }
    }

    static async removeCompatibleLaptop(req, res) {
        try {
            const LaptopRemoved = await AdapterServices.deleteCompatibleLaptop(req.params.id, req.params.laptop_id);
            return res.status(200).json(LaptopRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServics.getTimeCurrent()} Can't remove compatible laptop with adapter! Error: ${err}`)
        }
    }

    static async removeCompatibleLaptops(req, res) {
        try {
            const LaptopsRemoved = await AdapterServices.deleteCompatibleLaptops(req.params.id);
            return res.status(200).json(LaptopsRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServics.getTimeCurrent()} Can't remove compatible laptops with adapter! Error: ${err}`)
        }
    }

    static async removeAdapter(req, res) {
        try {
            const AdapterTarget = await AdapterServices.deleteAdapter(req.params.id);
            return res.status(200).json(AdapterTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServics.getTimeCurrent()} Can't remove adapter! Error: ${err}`)
        }
    }
}

module.exports = AdapterController;