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
  BATCH_UPDATE: 'Batch Update',
  BATCH_UPDATE_KPS: 'Batch Update Kps',
  ADD_RANGE: 'Add Range',
  CLEAR_RANGES: 'Clear Ranges',
  ADD: 'Add',
  CLEAR: 'Clear',
  UPDATE: 'Update',

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
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  UPDATE_EXEC_TYPE: 'Update Execution Type',
  DELETE_EXEC_TYPE: 'Delete Execution Type',
  SAVE: 'Save',

  // MEASUREMENT QUANTITIES
  MEASUREMENT_QUANTITIES: 'Measurement Quantities',
  CREATE_MQS: 'Create MQs',
  CREATE_MQS_TITLE: 'New Measurement Quantity',
  IS_BALANCED: 'Is Balanced?',
  MQ_UNIT: 'Measurement Quantity Unit',
  QUANTITY: 'Quantity',

  // Pipeline Management
  PIPELINE_MANAGER: 'Pipeline Manager',

  // Project Crews
  CREWS: 'Crews',
  CREATE_CREW: 'Create Crew',
  CREATE_CREWS_TITLE: 'New Crew',
  START_DATE: 'Start Date',
  END_DATE: 'End Date',
  IS_ACTIVE: 'Is Active?',
  MAIN_PERFORMING_ACTIVITY: 'Main Performing Activity',

  // Measurement Quantity Steps
  MEASUREMENT_QUANTITY_STEPS: 'Measurement Quantity Steps',
  STEPS: 'Steps',
  CREATE_STEPS: 'Create Steps',
  TITLE: 'Title',
  WEIGHT: 'Weight',
  ADD_STEP: 'Add Step',
  UNIT: 'Unit',
  BALANCED: 'Balanced',
  DETAILS: 'Details',
  OK: 'OK',
  EDIT: 'Edit',
  REMOVE: 'Remove',

  // Kp Assignments
  KP_ASSIGNMENTS: 'Kp Assignments',
  SELECT_MQ: 'Select MQ',

  // Is Completed Modal
  SUBMIT: 'Submit',
  COMPLETED_NOTE: 'Completed Note',
  COMPLETE: 'Complete',
  NOTE: 'Note',
  CREW: 'Crew',
  COMPLETE_DATE: 'Complete Date',
  COMPLETED_DATE: 'Completed Date',

  // Summary
  SUMMARY: 'Summary',
  ADD_SUMMARY: 'Add Summary',
  WHICH_MEASUREMENT_QUANTITIES_DO_YOU_WANT_TO_SUMMARIZE: 'Which measurement quantities do you want to summarize?',

  // Modal
  CLOSE: 'Close',
  CONFIRM: 'Confirm',
  MODAL_TITLE: 'Modal Title',
};

export const validateWords: any = {
  required: 'This field is required',
  minlength: 'This field is too short',
  maxlength: 'This field is too long',
  email: 'This field must be a valid email',
};

export const confirmDelete = (type?: string, name?: string): string => `Are you sure you want to delete ${type || ''} ${name || ''}?`;

export const word = (key: string): string => wordsMap[key] || 'No word';
export const errorMessage = (key: string): string => validateWords[key] || key;
