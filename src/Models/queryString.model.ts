//An interface for the query string to be entered by the API user

interface IQueryString {
  imageName?: string;
  desiredWidth?: string;
  desiredHeight?: string;
  all?: boolean;
}

export default IQueryString;
