const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const DateServices = require("../services/DateServices");
const GPU_services = require("../services/GPU_services");

async function connectToDB() {
    await mongoose.connect(process.env.DB_URI);
    console.log(`${DateServices.getTimeCurrent()} Connected GPU controller to database successfully! ^-^`);
}

connectToDB();

app.use(express.json());

class GPU_controller {
    static async addGPU(req, res) {
        try {
            const NewGPU = await GPU_services.createGPU(req.body);
            return res.status(201).json(NewGPU);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't add GPU! Error: ${err}`);
        }
    }

    static async getGPUs(req, res) {
        try {
            const GPUsList = await GPU_services.readGPUs();
            return res.status(200).json(GPUsList);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get GPUs list! Error: ${err}`);
        }
    }

    static async getGPU_byID(req, res) {
        try {
            const GPU_target = await GPU_services.readGPUByID(req.params.id);
            return res.status(200).json(GPU_target);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't get GPU by ID! Error: ${err}`);
        }
    }

    static async setGPU(req, res) {
        try {
            const GPU_target = await GPU_services.updateGPU(req.params.id, req.body);
            return res.status(200).json(GPU_target);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't set GPU! Error: ${err}`);
        }
    }

    static async removeGPU(req, res) {
        try {
            const GPU_removed = await GPU_services.deleteGPU(req.params.id);
            return res.status(200).json(GPU_removed);
        } catch (err) {
            res.status(400);
            console.error(`${DateServices.getTimeCurrent()} Can't remove GPU! Error: ${err}`);
        }
    }
}

module.exports = GPU_controller;