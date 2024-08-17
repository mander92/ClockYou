import generateErrorUtil from "../../utils/generateErrorUtil.js";


const editUserController = async (req,res,next) =>{
    try {
        
        const { userId } = req.params;
        const { email, userName, firstName, lastName, dni, phone, address, postCode, city } = req.body; 



    } catch (error) {
        
    }
}

export default editUserController;