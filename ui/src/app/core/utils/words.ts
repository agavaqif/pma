export const wordsMap: any = {
  // Home
  CREATE_NEW_PROJECT: 'Create New Project',
  PROJECT_NAME: 'Project Name',

  // Project Wizard
  CREATE_KPS: 'Create Kps',
  START: 'Start',
  END: 'End',
  KP_UNIT: 'Kp Unit',
  ACCURACY: 'Accuracy',
  KPS: 'Kps',

  // Kp Unit
  METER: 'Meter',
  KILOMETER: 'Kilometer',

  // EXECUTION TYPES
  EXEC_TYPES: 'Execution Types',
  EXEC_TYPE: 'Execution Type',
  CREATE_EXEC_TYPES: 'Create Execution Types',
  CREATE_EXEC_TYPE: 'Create Execution Type',
  CREATE: 'Create',
  NAME: 'Name',
  CODE: 'Code',

  // MEASUREMENT QUANTITIES
  MEASUREMENT_QUANTITIES: 'Measurement Quantities',
  CREATE_MQS: 'Create MQs',
  CREATE_MQS_TITLE: 'New Measurement Quantity',
  IS_BALANCED: 'Is Balanced?',
  MQ_UNIT: 'Measurement Quantity Unit',
};

export const validateWords: any = {
  required: 'This field is required',
  minlength: 'This field is too short',
  maxlength: 'This field is too long',
  email: 'This field must be a valid email',
};

export const word = (key: string): string => wordsMap[key] || 'No word';
export const errorMessage = (key: string): string => validateWords[key] || key;
