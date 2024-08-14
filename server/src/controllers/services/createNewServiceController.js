import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';

import generateErrorUtil from "../../utils/generateErrorUtil.js"

const createNewServiceController = async (req, res) =>{
    try {
        
        const { tokenInfo } = req.userLogged;
        
        const {type, description, city}  = req.body;




    } catch (error) {
        
    }
}

export default createNewServiceController;