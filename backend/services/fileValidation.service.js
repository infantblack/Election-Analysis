export const validateFiles = (files) => {
  if (!files || files.length === 0) {
    throw new Error("No files uploaded");
  }

  if (files.length > Number(process.env.MAX_FILE_COUNT)) {
    throw new Error("Too many files uploaded");
  }

  files.forEach(file => {
    if (file.size > Number(process.env.MAX_FILE_SIZE)) {
      throw new Error("File size exceeds limit");
    }
  });
};
