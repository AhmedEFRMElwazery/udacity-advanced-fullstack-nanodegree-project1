import express, { Router, Request, Response } from 'express';
import logger from '../../modules/logger.module';
import CheckLocalImages from '../../modules/checkLocalImages.module';
import CreateProcessedImage from '../../modules/createProcessedImage.module';
import validateUserInputs from '../../modules/validator.module';
import chalk from 'chalk';

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

    let outcome: null | string = '';

    //Creates the processed image with the desired dimensions (i.e. width and height),
    //if the image is not already created
    if (req.query.imageName === 'all') {
      if (!(await CheckLocalImages.getAvailableProcessedImages(req.query))) {
        outcome = await CreateProcessedImage.createAProcessedImage(req.query);
      } else {
        console.log(
          chalk.bgRed.whiteBright(
            'A number of processed images with similar dimensions were already created. Thus, No newly processed images were created! Caching the last alpha-numerically listed image that was already saved.'
          )
        );
      }
    } else if (
      !(await CheckLocalImages.checkAvailabilityOfProcessedImage(req.query))
    ) {
      outcome = await CreateProcessedImage.createAProcessedImage(req.query);
    }

    if (outcome) {
      res.send(outcome);
      return;
    }

    //Gets the proper path for the image and displays it on screen.
    const fpath: null | string = await CheckLocalImages.determineImagePath(
      req.query
    );
    if (fpath) {
      res.sendFile(fpath);
    } else {
      res.send(
        'Error from the (imageEndpoint) Endpoint: something have gone wrong!'
      );
    }
  }
);

export default imageEndpoint;
