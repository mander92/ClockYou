// La función recibe el recurso solicitado
export const notFoundError = (resource) => {
    throw {
      httpStatus: 404, // Not Found
      code: 'RESOURCE_NOT_FOUND',
      message: `El recurso '${resource}' no existe`,
    };
  };
  
  export const sendEmailError = () => {
    throw {
      httpStatus: 500, // Internal Server Error
      code: 'SEND_EMAIL_ERROR',
      message: 'Error al enviar el email',
    };
  };
  
  export const usernameAlreadyRegisteredError = () => {
    throw {
      httpStatus: 409, // Conflict
      code: 'USER_ALREADY_REGISTERED',
      message: 'El nombre de usuario ya está registrado',
    };
  };
  
  export const emailAlreadyRegisteredError = () => {
    throw {
      httpStatus: 409, // Conflict
      code: 'EMAIL_ALREADY_REGISTERED',
      message: 'El email ya está registrado',
    };
  };
  
  export const invalidCredentialsError = () => {
    throw {
      httpStatus: 401, // Unauthorized
      code: 'INVALID_CREDENTIALS',
      message: 'Credenciales inválidas',
    };
  };
  
  export const pendingActivationError = () => {
    throw {
      httpStatus: 403, // Forbidden
      code: 'PENDING_ACTIVATION',
      message: 'Usuario pendiente de activación. Revisa tu email',
    };
  };
  
  // Usuario ya activado
  export const userAlreadyActivatedError = () => {
    throw {
      httpStatus: 409, // Conflict
      code: 'USER_ALREADY_ACTIVATED',
      message: 'El usuario ya está activado',
    };
  };
  
  export const notAuthenticatedError = () => {
    throw {
      httpStatus: 401, // Unauthorized
      code: 'NOT_AUTHENTICATED',
      message:
        'Debes enviar el token de autenticación en la cabecera "Authorization"',
    };
  };
  
  export const notAuthorizedError = () => {
    throw {
      httpStatus: 403, // Forbidden
      code: 'NOT_AUTHORIZED',
      message: 'No tienes permisos para realizar esta acción',
    };
  };
  
  export const saveFileError = () => {
    throw {
      httpStatus: 500, // Internal Server Error
      code: 'FILE_SAVE_FAILED',
      message: 'Error al guardar el archivo en el disco',
    };
  };