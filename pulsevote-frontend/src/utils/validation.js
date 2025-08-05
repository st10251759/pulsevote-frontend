// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Strong password validation
export const isStrongPassword = (password) => {
  // At least 8 characters, contains letter, number, and special character
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
  return passwordRegex.test(password);
};

// Basic input validation
export const validateRegistrationForm = (formData) => {
  const errors = [];

  // Check if all fields are provided
  if (!formData.email || !formData.password || !formData.confirmPassword) {
    errors.push("All fields are required");
    return errors;
  }

  // Email validation
  if (!isValidEmail(formData.email)) {
    errors.push("Please enter a valid email address");
  }

  // Password validation
  if (!isStrongPassword(formData.password)) {
    errors.push("Password must be at least 8 characters long and include letters, numbers, and special characters");
  }

  // Password confirmation
  if (formData.password !== formData.confirmPassword) {
    errors.push("Passwords do not match");
  }

  return errors;
};

export const validateLoginForm = (formData) => {
  const errors = [];

  // Check if all fields are provided
  if (!formData.email || !formData.password) {
    errors.push("Email and password are required");
    return errors;
  }

  // Email validation
  if (!isValidEmail(formData.email)) {
    errors.push("Please enter a valid email address");
  }

  return errors;
};