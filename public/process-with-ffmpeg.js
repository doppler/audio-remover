const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static").path.replace(
  "app.asar",
  "app.asar.unpacked"
);
const ffProbePath = require("ffprobe-static").path.replace(
  "app.asar",
  "app.asar.unpacked"
);

module.exports = (request, statusUpdate) => {
  ffmpeg.setFfmpegPath(ffmpegPath);
  ffmpeg.setFfprobePath(ffProbePath);

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
          progress
        });
      })
      .on("end", (stdout, stderr) => {
        statusUpdate({
          file: file.name,
          status: "end"
        });
      })
      .output(outputPath)
      .run();
    return null;
  });
};
