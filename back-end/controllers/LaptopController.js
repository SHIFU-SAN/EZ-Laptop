const DateServices = require("../services/dateServices");
const LaptopServices = require("../services/laptopServices");

class LaptopController {
    static async addLaptop(req, res) {
        try {
            const NewLaptop = await LaptopServices.createLaptop(req.body);
            return res.status(201).json(NewLaptop);
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't add new laptop! Error: ${err.message}`);
            return res.status(400).send({
                message: "Can't add new laptop!",
                error: err.message
            });
        }
    }

    static async getAllLaptops(req, res) {
        try {
            const FoundLaptops = await LaptopServices.findAllLaptops();
            return res.status(200).json(FoundLaptops);
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't get all laptops! Error: ${err.message}`);
        }
    }

    static async getLaptopByID(req, res) {
        try {
            const FoundLaptop = await LaptopServices.findLaptopByID(req.params?.laptop_id);
            return res.status(200).json(FoundLaptop);
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't get laptop by ID! Error: ${err.message}`);
        }
    }

    static async setLaptop(req, res) {
        try {
            const SetLaptop = await LaptopServices.updateLaptop(req.body?.LaptopID, req.body);
            return res.status(200).json(SetLaptop);
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't set new laptop! Error: ${err.message}`);
            return res.status(400).send({
                message: "Can't set new laptop!",
                error: err.message
            });
        }
    }

    static async setImage(req, res) {
        try {
            const SetLaptop = await LaptopServices.updateLaptop(req.body?.LaptopID, {Image: req?.file?.path});
            return res.status(200).json(SetLaptop);
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't set new image! Error: ${err.message}`);
            return res.status(400).send({
                message: "Can't set new image!",
                error: err.message
            });
        }
    }

    static async removeLaptop(req, res) {
        try {
            const RemovedLaptop = await LaptopServices.deleteLaptop(req.body?.LaptopID);
            return res.status(200).json(RemovedLaptop);
        } catch (err) {
            console.log(`${DateServices.getTimeCurrent()} Can't remove laptop! Error: ${err.message}`);
            return res.status(400).send({
                message: "Can't remove laptop!",
                error: err.message
            })
        }
    }
}

module.exports = LaptopController;