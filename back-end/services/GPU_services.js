const GPU = require("../models/GPU");

class GPU_services {
    static async createGPU(info) {
        const NewGPU = new GPU({
            Branch: new_info.Branch,
            Name: new_info.Name,
            VRAM: new_info.VRAM,
            TDP: new_info.TDP
        });

        await NewGPU.save();

        return NewGPU ? NewGPU : null;
    }

    static async readGPUs() {
        const GPUs = await GPU.find();

        return GPUs ? GPUs : null;
    }

    static async readGPUByID(id) {
        const GPU = await GPU.findById(id);

        return GPU ? GPU : null;
    }

    static async updateGPU(id, new_info) {
        let GPU_target = await GPU.findById(id);

        if (new_info.Branch) {
            GPU_target.Branch = new_info.Branch;
        }
        if (new_info.Name) {
            GPU_target.Name = new_info.Name;
        }
        if (new_info.VRAM) {
            GPU_target.VRAM = new_info.VRAM;
        }
        if (new_info.TDP) {
            GPU_target.TDP = new_info.TDP;
        }

        await GPU_target.save();

        return GPU_target ? GPU_target : null;
    }

    static async deleteGPU(id) {
        const GPU_deleted = GPU.findByIdAndDelete(id);

        return GPU_deleted ? GPU_deleted : null;
    }
}

module.exports = GPU_services;