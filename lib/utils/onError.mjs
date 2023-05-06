function onError(error) {
  if (error.isTtyError) {
    // Prompt couldn't be rendered in the current environment
    console.log(error.message);
  } else {
    console.log(error);
  }
};

export {onError};
