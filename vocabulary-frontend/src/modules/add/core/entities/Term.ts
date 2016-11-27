/**
 * Created by alexandrosfilios on 30/10/16.
 */

import {Definition} from "./Definition";
export enum Type {
    VERB = "VERB",
    NOUN = "NOUN",
    PHRASE = "PHRASE"
}
export enum Gender {
    MASCULINE = "MASCULINE",
    FEMININE = "FEMININE"
}
    
export class Term {
    public id: number;
    public type: Type;
    public term: string;
    public comments: string;
    public gender: Gender;
    public definitions: Array<Definition>;
    public createdOn: string;
    constructor(id?: number,
                type?: Type,
                term?: string,
                comments?: string,
                gender?: Gender,
                createdOn?: string,
                definitions?: Array<Definition>) {
        this.id = id || 0;
        this.type = type || Type.PHRASE;
        this.term = term || '';
        this.comments = comments || '';
        this.gender = gender || null;
        this.createdOn = createdOn || new Date();
        this.definitions = definitions || [];
    }
    public isEmpty(): boolean {
        return this.term.length > 0 && this.type;
    }
    public static getAllTypes(): Array<Type> {
        return [Type.NOUN, Type.PHRASE, Type.VERB];
    }
    public static getAllGenders(): Array<Gender> {
        return [Gender.FEMININE, Gender.MASCULINE];
    }
    public withExtraFields(): Term {
        this.definitions = this.definitions.concat(new Definition())
            .map(definition => definition.withExtraFields());
        return this;
    }
}
