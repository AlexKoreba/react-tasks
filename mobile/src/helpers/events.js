import {EventEmitter} from 'events';

let clientEvents = new EventEmitter();

// "EClientDeleted"
// "EClientEditing"
// "EClientInfoChanged"

export {clientEvents};