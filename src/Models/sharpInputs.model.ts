//An interface for the parameters to be used as input for the sharp package

interface ISharpInputs {
  original: string;
  processed: string;
  width: number;
  height: number;
}

export default ISharpInputs;
