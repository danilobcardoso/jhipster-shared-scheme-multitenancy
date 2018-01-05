import { BaseEntity } from './../../shared';

export class Contact implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public phone?: string,
        public customer?: BaseEntity,
    ) {
    }
}
