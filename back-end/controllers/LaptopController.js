const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const LaptopServices = require("../services/LaptopServices");

async function connectToDB() {
    await mongoose.connect(process.env.DB_URI);
    console.log(`${DateServices.getTimeCurrent()} Connected laptop controller to database successfully! ^-^`);
}

connectToDB();

app.use(express.json());

class LaptopController {
    static async addLaptop(req, res) {
        try {
            const NewLaptop = await LaptopServices.createLaptop(req.body);
            return res.status(201).json(NewLaptop);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add laptop! Error: ${err}`);
        }
    }

    static async getLaptops(req, res) {
        try {
            const LaptopsList = await LaptopServices.readLaptops();
            return res.status(200).json(LaptopsList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get laptops list! Error: ${err}`);
        }
    }

    static async getLaptopByID(req, res) {
        try {
            const LaptopTarget = await LaptopServices.readLaptopByID(req.params.id);
            return res.status(200).json(LaptopTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get laptop by ID! Error: ${err}`);
        }
    }

    static async setLaptop(req, res) {
        try {
            const LaptopTarget = await LaptopServices.updateLaptop(req.params.id, req.body);
            return res.status(200).json(LaptopTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set laptop! Error: ${err}`);
        }
    }

    static async addPort(req, res) {
        try {
            const NewPort = await LaptopServices.createPort(req.params.id, req.body);
            return res.status(201).json(NewPort);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add port to laptop! Error: ${err}`);
        }
    }

    static async addMorePorts(req, res) {
        try {
            const LaptopID = req.params.id;
            const NewPorts = req.body.map(async port => await LaptopServices.createPort(LaptopID, port));
            return res.status(201).json(NewPorts);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add more port to laptop! Error: ${err}`);
        }
    }

    static async removePort(req, res) {
        try {
            const PortRemoved = await LaptopServices.deletePort(req.params.id, req.params.port_id);
            return res.status(200).json(PortRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove port to laptop! Error: ${err}`);
        }
    }

    static async removePorts(req, res) {
        try {
            const PortsRemoved = await LaptopServices.deletePort(req.params.id);
            return res.status(200).json(PortsRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove ports to laptop! Error: ${err}`);
        }
    }

    static async addImage(req, res) {
        try {
            const NewImage = await LaptopServices.createImage(req.params.id, req.body);
            return res.status(201).json(NewImage);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add image to laptop! Error: ${err}`);
        }
    }

    static async addMoreImages(req, res) {
        try {
            const LaptopID = req.params.id;
            const NewImages = req.body.map(async image => await LaptopServices.createImage(LaptopID, image));
            return res.status(201).json(NewImages);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add more image to laptop! Error: ${err}`);
        }
    }

    static async removeImage(req, res) {
        try {
            const ImageRemoved = await LaptopServices.deleteImage(req.params.id, req.params.image_id);
            return res.status(200).json(ImageRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove image to laptop! Error: ${err}`);
        }
    }

    static async removeImages(req, res) {
        try {
            const ImagesRemoved = await LaptopServices.deleteImage(req.params.id);
            return res.status(200).json(ImagesRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove images to laptop! Error: ${err}`);
        }
    }

    static async removeLaptop(req, res) {
        try {
            const LaptopRemoved = await LaptopServices.deleteLaptop(req.params.id);
            return res.status(200).json(LaptopRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove adapter to laptop! Error: ${err}`);
        }
    }
}

module.exports = LaptopController;