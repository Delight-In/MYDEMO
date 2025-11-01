import { body } from 'express-validator';

// Password strength validation function
const isStrongPassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  
  return password.length >= minLength && 
         hasUpperCase && 
         hasLowerCase && 
         hasNumbers && 
         hasSpecialChar;
};

// Validation middleware
const validateRegistration = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').custom((value) => {
    if (!isStrongPassword(value)) {
      throw new Error('Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters');
    }
    return true;
  })
];

export default validateRegistration;