import express, { Router, Request, Response } from 'express';
import logger from '../../modules/logger.module';
import CheckLocalImages from '../../modules/checkLocalImages.module';
import CreateProcessedImage from '../../modules/createProcessedImage.module';
import validateUserInputs from '../../modules/validator.module';

const images: Router = express.Router();

images.get('/', logger, async (req: Request, res: Response): Promise<void> => {
  // Checks whether the user request is a valid one
  const validationOutcome: null | string = await validateUserInputs(req.query);
  if (validationOutcome) {
    res.send(validationOutcome);
  }

  let err: null | string = '';

  // Creates the processed image with the desired dimensions
  if (!(await CheckLocalImages.checkAvailabilityOfProcessedImage(req.query))) {
    err = await CreateProcessedImage.createAProcessedImage(req.query);
  }

  // Handle image processing err
  if (err) {
    res.send(err);
    return;
  }

  // Retrieve appropriate image path and display image
  const fpath: null | string = await CheckLocalImages.determineImagePath(
    req.query
  );
  if (fpath) {
    res.sendFile(fpath);
  } else {
    res.send('Server Error: something have gone wrong!');
  }
});

export default images;
