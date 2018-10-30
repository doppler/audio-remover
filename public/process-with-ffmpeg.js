const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static").path.replace(
  "app.asar",
  "app.asar.unpacked"
);

ffmpeg.setFfmpegPath(ffmpegPath);

module.exports = (request, status) => {
  console.log(ffmpegPath);
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
