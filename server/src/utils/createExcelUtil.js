import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';

const createExcelFile = async (data, columns, fileName) => {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        worksheet.columns = columns;

        data.forEach((row) => {
            worksheet.addRow(row);
        });

        const directoryPath = path.resolve('documents');

        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }

        const filePath = path.resolve(directoryPath, fileName);
        await workbook.xlsx.writeFile(filePath);

        return filePath;
    } catch (error) {
        console.error('Error creating Excel file:', error);
        throw new Error('Error creating Excel file');
    }
};

export default createExcelFile;
