import { AbstractAction } from './AbstractAction';
import { TestAction } from './extension.testAction';

export interface ActionsList {
  [K: string]: typeof AbstractAction;
}

export const actionsList: ActionsList = {
  'extension.testAction': TestAction,
};