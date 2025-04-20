const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const HardDriveServices = require("../services/HardDriveServices");

async function connectToDB() {
    await mongoose.connect(process.env.DB_URI);
    console.log(`${DateServices.getTimeCurrent()} Connected hard drive controller to database successfully! ^-^`);
}

connectToDB();

app.use(express.json());

class HardDriveController {
    static async addHardDrive(req, res) {
        try {
            const NewHardDrive = await HardDriveServices.createHardDrive(req.body);
            return res.status(201).json(NewHardDrive);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add hard drive! Error: ${err}`);
        }
    }

    static async getHardDrives(req, res) {
        try {
            const HardDrivesList = await HardDriveServices.readHardDrives();
            return res.status(200).json(HardDrivesList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get hard drives list! Error: ${err}`);
        }
    }

    static async getHardDriveByID(req, res) {
        try {
            const HardDriveTarget = await HardDriveServices.readHardDriveByID(req.params.id);
            return res.status(200).json(HardDriveTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get hard drive by ID! Error: ${err}`);
        }
    }

    static async setHardDrive(req, res) {
        try {
            const HardDriveTarget = await HardDriveServices.updateHardDrive(req.params.id, req.body);
            return res.status(200).json(HardDriveTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set hard drive! Error: ${err}`);
        }
    }

    static async addLaptopInstallation(req, res) {
        try {
            const NewInstallation = await HardDriveServices.createLaptopInstallation(req.params.id, req.body);
            return res.status(201).json(NewInstallation);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add laptop installation! Error: ${err}`);
        }
    }

    static async addMoreInstallations(req, res) {
        try {
            const HardDriveID = req.params.id;
            const NewInstallations = req.body.map(async installation => await HardDriveServices.createLaptopInstallation(HardDriveID, installation));
            return res.status(201).json(NewInstallations);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add more laptop installation! Error: ${err}`);
        }
    }

    static async removeLaptopInstallation(req, res) {
        try {
            const InstallationRemoved = await HardDriveServices.deleteLaptopInstallation(req.params.id, req.params.installation_id);
            return res.status(200).json(InstallationRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove laptop installation! Error: ${err}`);
        }
    }

    static async removeLaptopInstalltions(req, res) {
        try {
            const InstallationsRemoved = await HardDriveServices.deleteLaptopInstallations(req.params.id);
            return res.status(200).json(InstallationsRemoved);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove laptop installtions! Error: ${err}`);
        }
    }

    static async removeHardDrive(req, res) {
        try {
            const HardDriveTarget = await HardDriveServices.deleteHardDrive(req.params.id);
            return res.status(200).json(HardDriveTarget);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove hard drive! Error: ${err}`);
        }
    }
}

module.exports = HardDriveController;