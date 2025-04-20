const CPU = require('../models/CPU');

class CPU_services {
    static async createCPU(info) {
        let NewCPU = new CPU({
            Branch: info.Branch,
            Name: info.Name,
            NumberCores: info.NumberCores,
            NumberThreads: info.NumberThreads,
            L2_cache: info.L2_cache,
            L3_cache: info.L3_cache,
            ProcessorTechnology: info.ProcessorTechnology,
            DefaultTDp: info.DefaultTDp,
            MaxTDP: info.MaxTDP,
            AMD: {
                BaseClock: info.AMD.BaseClock,
                BoostClock: info.AMD.BoostClock
            },
            Intel: {
                NumberPcores: info.Intel.NumberPcores,
                BaseClockPcores: info.Intel.BaseClockPcores,
                BoostClockPcores: info.Intel.BoostClockPcores,
                NumberEcores: info.Intel.NumberEcores,
                BaseClockEcores: info.Intel.BaseClockEcores,
                BoostClockEcores: info.Intel.BoostClockEcores
            }
        });

        await NewCPU.save();

        return NewCPU ? NewCPU : null;
    }

    static async readCPUs() {
        const CPUs = await CPU.find();

        return CPUs ? CPUs : null;
    }

    static async readCPU_byID(id) {
        const CPU_target = await CPU.findById(id);

        return CPU_target ? CPU_target : null;
    }

    static async updateCPU(id, new_info) {
        let CPU_target = await CPU.findById(id);

        if (new_info.Branch) {
            CPU_target.Branch = new_info.Branch;
        }
        if (new_info.Name) {
            CPU_target.Name = new_info.Name;
        }
        if (new_info.NumberCores) {
            CPU_target.NumberCores = new_info.NumberCores;
        }
        if (new_info.NumberThreads) {
            CPU_target.NumberThreads = new_info.NumberThreads;
        }
        if (new_info.L2_cache) {
            CPU_target.L2_cache = new_info.L2_cache;
        }
        if (new_info.L3_cache) {
            CPU_target.L3_cache = new_info.L3_cache;
        }
        if (new_info.ProcessorTechnology) {
            CPU_target.ProcessorTechnology = new_info.ProcessorTechnology;
        }
        if (new_info.DefaultTDp) {
            CPU_target.DefaultTDp = new_info.DefaultTDp;
        }
        if (new_info.MaxTDP) {
            CPU_target.MaxTDP = new_info.MaxTDP;
        }
        if (new_info.AMD.BaseClock) {
            CPU_target.AMD.BaseClock = new_info.AMD.BaseClock;
        }
        if (new_info.AMD.BoostClock) {
            CPU_target.AMD.BoostClock = new_info.AMD.BoostClock;
        }
        if (new_info.Intel.NumberPcores) {
            CPU_target.Intel.NumberPcores = new_info.Intel.NumberPcores;
        }
        if (new_info.Intel.BaseClockPcores) {
            CPU_target.Intel.BaseClockPcores = new_info.Intel.BaseClockPcores;
        }
        if (new_info.Intel.BoostClockPcores) {
            CPU_target.Intel.BoostClockPcores = new_info.Intel.BoostClockPcores;
        }
        if (new_info.Intel.NumberEcores) {
            CPU_target.Intel.NumberEcores = new_info.Intel.NumberEcores;
        }
        if (new_info.Intel.BaseClockEcores) {
            CPU_target.Intel.BaseClockEcores = new_info.Intel.BaseClockEcores;
        }
        if (new_info.Intel.BoostClockEcores) {
            CPU_target.Intel.BoostClockEcores = new_info.Intel.BoostClockEcores;
        }

        await CPU_target.save();

        return CPU_target ? CPU_target : null;
    }

    static async deleteCPU(id) {
        const CPU_deleted = await CPU.findByIdAndDelete(id);

        return CPU_deleted ? CPU_deleted : null;
    }
}

module.exports = CPU_services;