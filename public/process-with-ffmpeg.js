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
      .on("codecData", data => {
        statusUpdate({
          file: file.name,
          status: "codecData",
          originalDuration: data.duration
        });
      })
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
          status: "end",
          saved: outputPath
        });
      })
      .output(outputPath)
      .run();
    return null;
  });
};

ffmpeg("/path/to/file.avi").on("codecData", function(data) {
  console.log(
    "Input is " + data.audio + " audio " + "with " + data.video + " video"
  );
});
