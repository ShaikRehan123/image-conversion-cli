import sharp from "sharp";
import { readdir, readFile } from "node:fs/promises";

const inputImagesFolder = "./images";
const outputImagesFolder = "./output";

const main = async () => {
  const images = await readdir(inputImagesFolder);
  for (const image of images) {
    const inputPath = `${inputImagesFolder}/${image}`;

    const imageExtension = image.split(".").pop();
    const imageBuffer = await readFile(inputPath);
    const stats = await sharp(imageBuffer).metadata();
    const sizeInMB = stats?.size
      ? `${(stats.size / 1024 / 1024).toFixed(2)} MB`
      : "unknown";

    const outputPath = `${outputImagesFolder}/${image.replace(
      new RegExp(`.${imageExtension}$`),
      ".avif"
    )}`;

    const convertedImage = await sharp(imageBuffer).avif().toFile(outputPath);
    const convertedSizeInMB = `${(convertedImage.size / 1024 / 1024).toFixed(
      2
    )} MB`;

    console.log(
      `Converted ${image} (${sizeInMB}) to ${outputPath} (${convertedSizeInMB})`
    );
  }
};

main();
