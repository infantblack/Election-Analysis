const { spawn } = require("child_process");

exports.runPython = (filePath) => {
  return new Promise((resolve, reject) => {
    const p = spawn("python", ["../analysis/schema_generator.py", filePath]);
    let data = "";

    p.stdout.on("data", d => data += d.toString());
    p.on("close", () => resolve(JSON.parse(data)));
    p.on("error", reject);
  });
};
