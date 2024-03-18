export function validateEmailOrPhone(inputStr) {
  // Remove any leading/trailing whitespace
  const cleanedInput = inputStr.trim();

  // Check if it's an email address
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailPattern.test(cleanedInput)) {
    return "email";
  }

  // Check if it's a phone number (assuming digits only)
  const phonePattern = /^[6-9]{1}[0-9]{9}$/;
  if (phonePattern.test(cleanedInput)) {
    return "phone";
  }

  // If neither email nor phone, return 'unknown'
  return "unknown";
}
