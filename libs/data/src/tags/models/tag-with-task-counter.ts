import {Tag} from './tags';

interface ITagWithTaskCounter {
    id?: string;
    name: string;
    author: string;
    creationDate?: Date;
    modificationDate?: Date;
    tasksCounter: number;
}

export class TagWithTaskCounter extends Tag {
    tasksCounter = 0;
    constructor(kwargs: ITagWithTaskCounter) {
        super(kwargs);
        Object.assign(this, kwargs);
    }
}
