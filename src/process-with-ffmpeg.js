const ffmpeg = require("fluent-ffmpeg");

module.exports = (request, statusUpdate) => {
  request.files.map((file, i) => {
    const outputPath = `${request.targetDirectory}/${file.name}`;
    ffmpeg(file.path)
      .noAudio()
      .on("start", command => {
        statusUpdate({
          file: file.name,
          status: "start",
          command
        });
      })
      .on("progress", progress => {
        statusUpdate({
          file: file.name,
          status: "progress",
          progress: Math.round(progress.percent)
        });
      })
      .on("end", (stdout, stderr) => {
        statusUpdate({
          file: file.name,
          status: "end",
          saved: outputPath
        });
      })
      .output(outputPath)
      .run();
    return null;
  });
};
