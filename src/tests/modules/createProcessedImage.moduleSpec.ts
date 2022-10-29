import CreateProcessedImage from '../../modules/createProcessedImage.module';
import CheckLocalImages from '../../modules/checkLocalImages.module';

describe('Testing CreateProcessedImage module: ', (): void => {
  it('call the "createAProcessedImage" method from the "CreateProcessedImage" Class, and checks if the image was created, and should return true it exists', async (): Promise<void> => {
    await CreateProcessedImage.createAProcessedImage({
      imageName: 'santamonica',
      desiredWidth: '555',
      desiredHeight: '333',
    });

    const res = await CheckLocalImages.checkAvailabilityOfProcessedImage({
      imageName: 'santamonica',
      desiredWidth: '555',
      desiredHeight: '333',
    });
    expect(res).toBeTruthy();
  });
});
