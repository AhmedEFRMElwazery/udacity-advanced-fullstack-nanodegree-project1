//A class used to check local files availability.
import CheckLocalImages from './checkLocalImages.module';
//An interface for the query string parameters provided by the user.
import IQueryString from '../Models/queryString.model';

/**
 * A function to validate the query parameters entered by the user of the API.
 */
const validateUserInputs = async (
  query: IQueryString
): Promise<null | string> => {
  // Is the requested image available? Is the value for the "imageName" parameter does NOT equal to "all"
  if (
    !(await CheckLocalImages.checkAvailabilityOfOriginalImage(
      query.imageName
    )) &&
    query.imageName !== 'all'
  ) {
    const availableImageNames: string = (
      await CheckLocalImages.getAvailableOriginalImages()
    ).join(', ');
    return `Please pass either "all" or a proper imageName in the "imageName" query parameter. The available imageNames currently availabe in the "full" folder are: ${availableImageNames}.`;
  }

  //Checks whether the user has provided values for the "desiredWidth" and "desiredHeight" parameters

  if (!query.desiredWidth && !query.desiredHeight) {
    return null;
  }

  // Checks whether the user has enterd a valid value for the "desiredWidth" parameter
  const widthValue: number = parseInt(query.desiredWidth || '');
  if (Number.isNaN(widthValue) || widthValue < 1) {
    return "Please add a positive value for the number of pixels for the 'width' query parameter.";
  }

  // Checks whether the user has enterd a valid value for the "desiredHeight" parameter
  const heightValue: number = parseInt(query.desiredHeight || '');
  if (Number.isNaN(heightValue) || heightValue < 1) {
    return "Please add a positive value for the number of pixels for the 'height' query parameter.";
  }

  return null;
};

export default validateUserInputs;
