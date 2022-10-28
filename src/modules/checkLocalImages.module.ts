import { promises as fsPromises } from 'fs';
import path from 'path';
//An interface for the query string parameters provided by the user
import IQueryString from '../Models/queryString.model';

class CheckLocalImages {
  /**
   * Getting the initial paths o the folders in which both the original images and
   *  the processed images will be stored
   * */
  static originalPath = path.join(__dirname, '..', '..', 'assets/images/full');
  static afterProcessingPath = path.join(
    __dirname,
    '..',
    '..',
    'assets/images/thumb'
  );

  /**
   * A method to retrieve the image names available in the original (full) folder.
   */
  static async getAvailableOriginalImages(): Promise<string[]> {
    let availableImages: string[] | PromiseLike<string[]>;
    try {
      availableImages = await (
        await fsPromises.readdir(CheckLocalImages.originalPath)
      ).map((imageName: string): string => imageName.split('.')[0]); // Cut extension
      return availableImages;
    } catch {
      availableImages = [];
      return availableImages;
    }
  }

  /**
   * A method to check and get the image path.
   */
  static async determineImagePath(query: IQueryString): Promise<null | string> {
    if (!query.imageName) {
      return null;
    } else if (query.imageName.toLowerCase() === 'all') {
      const availableImages =
        await CheckLocalImages.getAvailableOriginalImages();
      query.imageName = availableImages[availableImages.length - 1];
    }

    //Builds the proper path
    let filePath: string;
    if (query.desiredWidth && query.desiredHeight) {
      filePath = path.join(
        CheckLocalImages.afterProcessingPath,
        `${query.imageName}_width_${query.desiredWidth}_height_${query.desiredHeight}.jpg`
      );
    } else {
      filePath = path.join(
        CheckLocalImages.originalPath,
        `${query.imageName}.jpg`
      );
    }

    //Checks if the file exists
    try {
      await fsPromises.access(filePath);
      return filePath;
    } catch {
      return null;
    }
  }

  /**
   * A method to check if an image is available.
   */
  static async checkAvailabilityOfOriginalImage(
    imageName = ''
  ): Promise<boolean> {
    if (!imageName) {
      return false;
    }

    return (await CheckLocalImages.getAvailableOriginalImages()).includes(
      imageName
    );
  }

  /**
   * A method to determine whether a processed image is available already.
   */
  static async checkAvailabilityOfProcessedImage(
    query: IQueryString
  ): Promise<boolean> {
    if (!query.imageName || !query.desiredWidth || !query.desiredHeight) {
      return false;
    }

    // Sets the proper path
    const filePath: string = path.join(
      CheckLocalImages.afterProcessingPath,
      `${query.imageName}_width_${query.desiredWidth}_height_${query.desiredHeight}.jpg`
    );

    try {
      await fsPromises.access(filePath);
      console.log(
        'A processed image of the same name and with similar dimensions was already created. No newly processed image was created! Caching the one already saved.'
      );
      return true;
    } catch {
      return false;
    }
  }
}

export default CheckLocalImages;
