import startShiftRecordService from '../../services/shiftRecords/startShiftRecordService.js';

const startShiftRecordsController = async (req, res, next) => {
    try {
        const { shiftRecordId } = req.params;
        const { location, clockIn } = req.body;

        if (!location || !Array.isArray(location) || location.length === 0) {
            return res.status(400).json({ error: 'Invalid location data' });
        }

        if (!clockIn) {
            return res.status(400).json({ error: 'Invalid clockIn data' });
        }

        console.log('Location:', location);
        console.log('ClockIn:', clockIn);

        const startDateTime = new Date(clockIn);

        await startShiftRecordService(shiftRecordId, location, startDateTime);

        res.send({
            status: 'ok',
            message: 'Hora de inicio registrada',
        });
    } catch (error) {
        next(error);
    }
};

export default startShiftRecordsController;
