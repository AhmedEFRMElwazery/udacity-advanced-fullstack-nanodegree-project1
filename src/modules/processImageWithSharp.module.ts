//A package used for image manipulation and resizing.
import sharp from 'sharp';
//An interface for the parameters to be used as input for the sharp package.
import ISharpInputs from '../Models/sharpInputs.model';

/**
 * A module to be used for image processing using the "sharp" package.
 */
const processImageWithSharp = async (
  sharpInput: ISharpInputs
): Promise<null | string> => {
  try {
    await sharp(sharpInput.original)
      .resize(sharpInput.width, sharpInput.height)
      .toFormat('jpeg')
      .toFile(sharpInput.processed);
    return null;
  } catch {
    return 'Error from the (processImageWithSharp) module: The server could not process the image!';
  }
};

export default processImageWithSharp;
