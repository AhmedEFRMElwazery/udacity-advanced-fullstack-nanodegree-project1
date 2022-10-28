//An interface for the query string to be entered by the API user

interface IQueryString {
  imageName?: string;
  desiredWidth?: string;
  desiredHeight?: string;
}

export default IQueryString;
