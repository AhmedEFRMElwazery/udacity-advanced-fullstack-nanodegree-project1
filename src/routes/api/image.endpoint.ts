import express, { Router, Request, Response } from 'express';
import logger from '../../modules/logger.module';
import CheckLocalImages from '../../modules/checkLocalImages.module';
import CreateProcessedImage from '../../modules/createProcessedImage.module';
import validateUserInputs from '../../modules/validator.module';

const imageEndpoint: Router = express.Router();

imageEndpoint.get(
  '/',
  logger,
  async (req: Request, res: Response): Promise<void> => {
    //Checks whether the user request is a valid one
    const validationOutcome: null | string = await validateUserInputs(
      req.query
    );
    if (validationOutcome) {
      res.send(validationOutcome);
      return;
    }

    let err: null | string = '';

    //Creates the processed image with the desired dimensions (i.e. width and height)
    if (
      !(await CheckLocalImages.checkAvailabilityOfProcessedImage(req.query))
    ) {
      err = await CreateProcessedImage.createAProcessedImage(req.query);
    }

    //Proper error handling...
    if (err) {
      res.send(err);
      return;
    }

    //Gets the proper path for the image and displays it on screen.
    const fpath: null | string = await CheckLocalImages.determineImagePath(
      req.query
    );
    if (fpath) {
      res.sendFile(fpath);
    } else {
      res.send('Server Error: something have gone wrong!');
    }
  }
);

export default imageEndpoint;
