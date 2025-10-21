// Email validation
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password) => {
    return password.length >= 6;
};

// Name validation
export const isValidName = (name) => {
    return name.trim().length >= 2;
};

// Word validation
export const isValidWord = (word) => {
    // Allow letters, numbers, spaces, and hyphens
    const wordRegex = /^[a-zA-Z0-9\s-]+$/;
    return wordRegex.test(word) && word.trim().length > 0;
};

// Form validation helper
export const validateForm = (values, rules) => {
    const errors = {};

    for (const field in rules) {
        const value = values[field];
        const fieldRules = rules[field];

        if (fieldRules.required && !value) {
            errors[field] = 'Trường này là bắt buộc';
            continue;
        }

        if (value) {
            if (fieldRules.minLength && value.length < fieldRules.minLength) {
                errors[field] = `Tối thiểu ${fieldRules.minLength} ký tự`;
            }

            if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
                errors[field] = `Tối đa ${fieldRules.maxLength} ký tự`;
            }

            if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
                errors[field] = fieldRules.message || 'Giá trị không hợp lệ';
            }

            if (fieldRules.validate) {
                const error = fieldRules.validate(value, values);
                if (error) {
                    errors[field] = error;
                }
            }
        }
    }

    return errors;
};

// Example usage:
/*
const loginRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Email không hợp lệ'
  },
  password: {
    required: true,
    minLength: 6,
    message: 'Mật khẩu phải có ít nhất 6 ký tự'
  }
};

const errors = validateForm(
  { email: 'test@example.com', password: '123' },
  loginRules
);
*/
