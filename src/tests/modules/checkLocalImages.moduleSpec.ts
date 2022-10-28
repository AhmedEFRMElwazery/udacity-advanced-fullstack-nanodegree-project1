import CheckLocalImages from '../../modules/checkLocalImages.module';

describe('Testing CheckLocalImages module: ', (): void => {
  it('should return true when entering valid image name (fjord)', async (): Promise<void> => {
    const res = await CheckLocalImages.checkAvailabilityOfOriginalImage(
      'fjord'
    );
    expect(res).toBeTruthy();
  });

  it('should return true as it returns a list of all images names stored in the "full" folder', async (): Promise<void> => {
    const res = await CheckLocalImages.getAvailableOriginalImages();
    expect(res).toBeTruthy();
  });
});
