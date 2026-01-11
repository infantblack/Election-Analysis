exports.validateFiles = (files) => {
  if (!files || files.length === 0) throw new Error("No files uploaded");

  files.forEach(f => {
    if (f.size > 2 * 1024 * 1024) throw new Error("File too large");
  });
};
