import validateUserInputs from '../../modules/validator.module';

describe('Testing Validator module: ', (): void => {
  it('should return null if the validation is successful (entering valid parameters)', async (): Promise<void> => {
    const res = await validateUserInputs({
      imageName: 'fjord',
      desiredWidth: '200',
      desiredHeight: '300',
    });
    expect(res).toBeNull();
  });

  it('should return null if the validation is successful (imageName: all is a valid paramter to resize all images at once)', async (): Promise<void> => {
    const res = await validateUserInputs({
      imageName: 'all',
      desiredWidth: '500',
      desiredHeight: '400',
    });
    expect(res).toBeNull();
  });

  it('should return an error message if the validation is unsuccessful (entering invalid parameters - no image with this name)', async (): Promise<void> => {
    const res = await validateUserInputs({
      imageName: 'maverick',
      desiredWidth: '200',
      desiredHeight: '300',
    });
    expect(res).toContain(
      "Please pass either 'all' or another proper imageName in the 'imageName' query parameter."
    );
  });

  it('should return an error message if the validation is unsuccessful (entering invalid parameters - negative number of pixels for desiredWidth)', async (): Promise<void> => {
    const res = await validateUserInputs({
      imageName: 'santamonica',
      desiredWidth: '-900',
      desiredHeight: '300',
    });
    expect(res).toContain(
      "Please add a positive value for the number of pixels for the 'desiredWidth' query parameter."
    );
  });
});
