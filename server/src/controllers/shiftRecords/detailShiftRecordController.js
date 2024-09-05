import selectShiftRecordByIdService from '../../services/shiftRecords/selectShiftRecordByIdService.js';

const detailShiftRecordController = async (req, res, next) => {
    try {
        const { shiftRecordId } = req.params;

        const data = await selectShiftRecordByIdService(shiftRecordId);

        res.send({
            status: 'ok',
            data,
        });
    } catch (error) {
        next(error);
    }
};
export default detailShiftRecordController;
