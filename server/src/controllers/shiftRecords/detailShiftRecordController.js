import selectShiftRecordByIdService from "../../services/shiftRecords/selectShiftRecordByIdService.js";

const detailShiftRecordController = async (req,res,next) => {
    try {

        const { shiftRecordId } = req.params;

        const shiftRecord = await selectShiftRecordByIdService(shiftRecordId);

        res.send({
            status: 'ok',
            data: shiftRecord
        });

    } catch (error) {
        next(error)
    }
}
export default detailShiftRecordController;