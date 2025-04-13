const {Adapter} = require("../models/Adapter");

async function addAdapter(info) {
    let NewAdapter = new Adapter({
        ID: info.ID,
        Branch: info.Branch,
        OutputVoltage: info.OutputVoltage,
        OutputCurrent: info.OutputCurrent,
        Price: info.Price
    });
    await NewAdapter.save();
    return NewAdapter;
}

async function getAllAdapters() {
    let result = await Adapter.find();
    return result ? result : null;
}

async function getAdapterByID(id) {
    let result = await Adapter.findOne({ID: id});
    return result ? result : null;
}

async function updateAdapter(id, new_info) {
    let result = await Adapter.findOne({ID: id});
    if (new_info.Branch) {
        result.Branch = new_info.Branch;
    }
    if (new_info.OutputVoltage) {
        result.OutputVoltage = new_info.OutputVoltage;
    }
    if (new_info.OutputCurrent) {
        result.OutputCurrent = new_info.OutputCurrent;
    }
    if (new_info.Price) {
        result.Price = new_info.Price;
    }
    await result.save();
    return result ? result : null;
}

async function deleteAdapter(id) {
    let result = await Adapter.findOneAndDelete({ID: id});
    return result ? result : null;
}

module.exports = {
    addAdapter,
    getAllAdapters,
    getAdapterByID,
    updateAdapter,
    deleteAdapter
}
