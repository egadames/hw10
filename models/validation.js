// This function is used to validate that a string is used
const confirmString = (answers) => {
  // This creates a variable that contains all letters uppercase, lowercase and a space
  const str = /[A-Za-z ]/g;
  // This method will match any letters or space with the answer given by the user
  // creates an array containing the matches
  const matchesArray = answers.match(str);
  // This checks if there is anything else submitted by the user
  if (matchesArray == null || matchesArray.length < answers.length) {
    // If user did not use a string it loads this message for them to update
    return 'Please enter a valid response. It can only contain letters';
  }
  // if no issues it returns true and prompt continues
  return true;
};


// This function is used to validate that only numbers are used
const confirmNumber = (value) => {
  // This checks if the user entered a number
  if (isNaN(value) === false) {
    // if no issues it returns true and prompt continues
    return true;
  }
  // If user did not use a string it loads this message for them to update
  return 'Please enter a valid response. It can only contain letters';
};

module.exports = {
  confirmNumber,
  confirmString,
};
