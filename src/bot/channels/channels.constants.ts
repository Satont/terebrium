export const CHANNEL_EDIT = 'CHANNEL_EDIT';
export const CHANNEL_DELETE = 'CHANNEL_DELETE';
export const CHANGE_CHANNEL_TITLE = 'CHANGE_CHANNEL_TITLE';
export const CHANGE_CHANNEL_CATEGORY = 'CHANGE_CHANNEL_CATEGORY';

export const CHANNEL_EDIT_REGEXP = new RegExp(`${CHANNEL_EDIT}.\\d+`);
export const CHANNEL_DELETE_REGEXP = new RegExp(`CHANNEL_DELETE.\\d+`);
export const CHANNEL_CHANGE_TITLE_REGEXP = new RegExp(`${CHANGE_CHANNEL_TITLE}.\\d+`);
export const CHANNEL_CHANGE_CATEGORY_REGEXP = new RegExp(`${CHANGE_CHANNEL_CATEGORY}.\\d+`);

export * as constants from './channels.constants';
