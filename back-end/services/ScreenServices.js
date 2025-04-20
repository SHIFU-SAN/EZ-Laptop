const Screen = require('../models/Screen');

class ScreenServices {
    static async createScreen(info) {
        const NewScreen = new Screen({
            ScreenType: info.ScreenType,
            Resolution: info.Resolution,
            Brightness: info.Brightness,
            RefreshRate: info.RefreshRate,
            ColorAccuracy: info.ColorAccuracy
        });

        await NewScreen.save();

        return NewScreen ? NewScreen : null;
    }

    static async readScreens() {
        const Screens = await Screen.find();

        return Screens ? Screens : null;
    }

    static async readScreenByID(id) {
        const ScreenTarget = await Screen.findById(id);

        return ScreenTarget ? ScreenTarget : null;
    }

    static async updateScreen(id, new_info) {
        let ScreenTarget = await Screen.findById(id);

        if (new_info.ScreenType) {
            ScreenTarget.ScreenType = new_info.ScreenType;
        }
        if (new_info.Resolution) {
            ScreenTarget.Resolution = new_info.Resolution;
        }
        if (new_info.Brightness) {
            ScreenTarget.Brightness = new_info.Brightness;
        }
        if (new_info.RefreshRate) {
            ScreenTarget.RefreshRate = new_info.RefreshRate;
        }
        if (new_info.ColorAccuracy) {
            ScreenTarget.ColorAccuracy = new_info.ColorAccuracy;
        }

        await ScreenTarget.save();

        return ScreenTarget ? ScreenTarget : null;
    }

    static async deleteScreen(id) {
        const ScreenDeleted = await Screen.findByIdAndDelete(id);

        return ScreenDeleted ? ScreenDeleted : null;
    }
}

module.exports = ScreenServices;