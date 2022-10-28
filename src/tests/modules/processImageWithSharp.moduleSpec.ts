import path from 'path';
import processImageWithSharp from '../../modules/processImageWithSharp.module';
import checkLocalImages from '../../modules/checkLocalImages.module';

describe('Testing processImageWithSharp module: ', (): void => {
  it('should return null if the resized image is successfully created (entering valid parameters)', async (): Promise<void> => {
    const res = await processImageWithSharp({
      original: path.join(
        __dirname,
        '..',
        '..',
        '..',
        'assets/images/full/fjord.jpg'
      ),
      processed: path.join(
        __dirname,
        '..',
        '..',
        '..',
        'assets/images/thumb/fjord_width_250_height_750.jpg'
      ),
      width: 250,
      height: 750,
    });
    expect(res).toBeNull();
  });
  it("Checks if the image was created by the 'processImageWithSharp' module, and should return true if it exists", async (): Promise<void> => {
    const res = await checkLocalImages.checkAvailabilityOfProcessedImage({
      imageName: 'fjord',
      desiredWidth: '250',
      desiredHeight: '750',
    });
    expect(res).toBeTruthy();
  });
});
