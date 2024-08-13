const notFoundErrorController = (req, res, next) => {
    res.status(404).send({
        status: 'error',
        message: 'Ruta no encontrada',
    });
};

export default notFoundErrorController;
