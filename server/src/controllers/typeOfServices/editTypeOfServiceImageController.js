import { deletePictureUtil, savePictureUtil } from '../../utils/photoUtil.js';
import selectTypeOfServiceByIdService from '../../services/typeOfServices/selectTypeOfServiceByIdService.js';
import updateTypeOfServiceImageService from '../../services/typeOfServices/updateTypeOfServiceImageService.js';

const editTypeOfserviceImageController = async (req, res, next) => {
    try {
        const { typeOfServiceId } = req.params;

        const type = await selectTypeOfServiceByIdService(typeOfServiceId);

        if (type.image) await deletePictureUtil(type.image);

        const imageName = await savePictureUtil(req.files.image, 400, 400);

        await updateTypeOfServiceImageService(imageName, typeOfServiceId);

        res.send({
            status: 'ok',
            message: 'Imágen actualizada correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default editTypeOfserviceImageController;
