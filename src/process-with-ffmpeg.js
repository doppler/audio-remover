const ffmpeg = require("fluent-ffmpeg");

module.exports = (request, status) => {
  request.files.map((file, i) => {
    const outputPath = `${request.targetDirectory}/${file.name}`;
    ffmpeg(file.path)
      .noAudio()
      .on("start", command => {
        status({
          file: file.name,
          command
        });
      })
      .on("progress", progress => {
        status({
          file: file.name,
          progress: Math.round(progress.percent)
        });
      })
      .on("end", (stdout, stderr) => {
        status({
          file: file.name,
          saved: outputPath
        });
      })
      .output(outputPath)
      .run();
    return null;
  });
};
