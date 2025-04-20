const express = require('express');
const app = express();
const router = express.Router();

const HardDriveController = require('../controllers/HardDriveController');

app.use(express.json());

router
    .post('/add', HardDriveController.addHardDrive)
    .get('/list', HardDriveController.getHardDrives)
    .get('/:id', HardDriveController.getHardDriveByID)
    .put('/:id', HardDriveController.setHardDrive)
    .post('/:id/installation/', HardDriveController.addLaptopInstallation)
    .post('/:id/installations', HardDriveController.addMoreInstallations)
    .delete('/:id/installations/:laptop_id', HardDriveController.removeLaptopInstallation)
    .delete('/:id/installations', HardDriveController.removeLaptopInstalltions)
    .delete('/:id', HardDriveController.removeHardDrive);

module.exports = router;