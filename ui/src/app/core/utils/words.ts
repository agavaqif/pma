export const wordsMap: any = {
  // Home
  CREATE_NEW_PROJECT: 'Create New Project',
};

export const validateWords: any = {
  required: 'This field is required',
  minlength: 'This field is too short',
  maxlength: 'This field is too long',
  email: 'This field must be a valid email',
}

export const word = (key: string): string => wordsMap[key] || key;
export const errorMessage = (key: string): string => validateWords[key] || key;
