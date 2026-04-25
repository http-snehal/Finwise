export const validateGSTIN = (gstin) => {
  // GSTIN format:
  // 2 digits state code (01-35)
  // 10 chars PAN (5 letters, 4 digits, 1 letter)
  // 1 digit entity number
  // 'Z' by default
  // 1 checksum character (alphanumeric)
  const gstinRegex = /^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin.toUpperCase());
};
