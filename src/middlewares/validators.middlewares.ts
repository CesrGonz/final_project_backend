import { body } from 'express-validator';

export const registerValidation = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 4 }).withMessage('Password too short'),
    body('name').notEmpty().withMessage('Name required')
];

export const loginValidation = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password required')
];

// Validación para proveedores
export const providerValidation = [
    body('name')
        .isLength({ min: 4, max: 40 }).withMessage('Name must be between 4 and 40 characters'),
    body('description').optional().isLength({ max: 2000 }).withMessage('Description must be less than 2000 characters'),
    body('direction').optional().isLength({ max: 100 }).withMessage('Direction must be less than 100 characters'),
    body('phone').optional().isLength({ max: 15 }).withMessage('Phone must be less than 15 characters'),
    body('email').optional().isEmail().withMessage('Invalid email'),
    body('active').isBoolean().withMessage('Active must be a boolean')
];

export const offerValidation = [
    body('title')
        .isLength({ min: 4, max: 40 }).withMessage('Titulo mas de 4 caracteres'),
    body('description').optional().isLength({ max: 2000 }),
    body('contactEmail').optional().isEmail().withMessage('Invalid email'),
    body('published').optional().isISO8601().toDate().withMessage('Formato de fecha incorrecto'),
    body('expired').isISO8601().toDate().withMessage('Formato de fecha incorrecto')
];

// Validación para productos
export const productValidation = [
    body('title')
        .isLength({ min: 4, max: 40 }).withMessage('Title must be between 4 and 40 characters'),
    body('description').optional().isLength({ max: 2000 }).withMessage('Description must be less than 2000 characters'),
    body('active').isBoolean().withMessage('Active must be a boolean'),
    body('provider').isInt().withMessage('Provider must be an integer'),
    body('location').optional().isLength({ max: 100 }).withMessage('Location must be less than 100 characters'),
    body('published').optional().isISO8601().toDate().withMessage('Published date must be in ISO8601 format'),
    body('expired').isISO8601().toDate().withMessage('Expired date must be in ISO8601 format')
];