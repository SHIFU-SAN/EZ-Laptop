const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const CPUServices = require("../services/CPU_services");

async function connectToDB() {
    await mongoose.connect(process.env.DB_URI);
    console.log(`${DateServices.getTimeCurrent()} Connected cpu controller to database successfully! ^-^`);

}

connectToDB();

app.use(express.json());

class CPUController {
    static async addCPU(req, res) {
        try {
            const NewCPU = await CPUServices.createCPU(req.body);
            return res.status(201).json(NewCPU);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add CPU! Error: ${err}`);
        }
    }

    static async getCPUs(req, res) {
        try {
            const CPUsList = await CPUServices.readCPUs();
            return res.status(200).json(CPUsList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get CPUs list! Error: ${err}`);
        }
    }

    static async getCPUByID(req, res) {
        try {
            const CPU_target = await CPUServices.getCPUByID(req.params.id);
            return res.status(200).json(CPU_target);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get CPU by ID! Error: ${err}`);
        }
    }

    static async setCPU(req, res) {
        try {
            const CPU_target = await CPUServices.updateCPU(req.params.id, req.body);
            return res.status(200).json(CPU_target);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set CPU! Error: ${err}`);
        }
    }

    static async removeCPU(req, res) {
        try {
            const CPU_removed = await CPUServices.deleteCPU(req.params.id);
            return res.status(200).json(CPU_removed);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove CPU! Error: ${err}`);
        }
    }
}

module.exports = CPUController;