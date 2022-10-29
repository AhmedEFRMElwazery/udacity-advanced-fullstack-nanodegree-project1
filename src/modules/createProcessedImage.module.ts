import chalk from 'chalk';
import path from 'path';
//An interface for the query string parameters provided by the user
import IQueryString from '../Models/queryString.model';
//A class used to check local files availability
import CheckLocalImages from './checkLocalImages.module';
//A module responsible for image processing using the sharp package
import processImageWithSharp from './processImageWithSharp.module';

/**
 * A new class dedicated for the creation of a processed image, which extends
 * over the "CheckLocalFile" class to gain access to its properties and methods.
 * */
class CreateProcessedImage extends CheckLocalImages {
  /**
   * A method to create a processed image.
   */
  static async createAProcessedImage(
    query: IQueryString
  ): Promise<null | string> {
    if (!query.imageName || !query.desiredWidth || !query.desiredHeight) {
      return null;
    }

    const filePathOriginal: string = path.join(
      CheckLocalImages.originalPath,
      `${query.imageName}.jpg`
    );
    const filePathAfterProcessed: string = path.join(
      CheckLocalImages.afterProcessingPath,
      `${query.imageName}_width_${query.desiredWidth}_height_${query.desiredHeight}.jpg`
    );

    console.log(
      chalk.bgGreenBright.whiteBright('Created A Processed Image...')
    );

    //Checks whether the user input value for the "imageName" is all, so it processes all the images in the "full" folder
    if (query.imageName.toLowerCase() === 'all') {
      const availableImages =
        await CheckLocalImages.getAvailableOriginalImages();
      for (let i = 0; i < availableImages.length; i++) {
        const filePathOriginal: string = path.join(
          CheckLocalImages.originalPath,
          `${availableImages[i]}.jpg`
        );
        const filePathAfterProcessed: string = path.join(
          CheckLocalImages.afterProcessingPath,
          `${availableImages[i]}_width_${query.desiredWidth}_height_${query.desiredHeight}.jpg`
        );

        if (
          availableImages.indexOf(availableImages[i]) + 1 ===
          availableImages.length
        ) {
          return await processImageWithSharp({
            original: filePathOriginal,
            processed: filePathAfterProcessed,
            width: parseInt(query.desiredWidth),
            height: parseInt(query.desiredHeight),
          });
        } else {
          await processImageWithSharp({
            original: filePathOriginal,
            processed: filePathAfterProcessed,
            width: parseInt(query.desiredWidth),
            height: parseInt(query.desiredHeight),
          });
        }
      }
      return null;
    }
    return await processImageWithSharp({
      original: filePathOriginal,
      processed: filePathAfterProcessed,
      width: parseInt(query.desiredWidth),
      height: parseInt(query.desiredHeight),
    });
  }
}

export default CreateProcessedImage;
