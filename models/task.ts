import { v4 as uuid } from 'uuid';

export class Task {
    uuid: string
    title: string
    isDone: boolean
    createdAt: Date

    constructor(
        uuid: string,
        title: string,
        completed: boolean,
        createdAt: Date
    ) {
        this.uuid = uuid;
        this.title = title;
        this.isDone = completed;
        this.createdAt = createdAt;
    }
}