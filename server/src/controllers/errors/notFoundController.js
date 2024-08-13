import { notFoundError } from '../../services/errorService.js';

export const notFoundController = (req, res, next) => {
	const resourcePath = req.path;
	console.log(`Recurso no encontrado: ${resourcePath}`);

	next(notFoundError(resourcePath));
};