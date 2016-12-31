/**
 * Created by alexandrosfilios on 30/10/16.
 */

import {Definition} from "./definition";
import {FormGroup, FormArray, FormControl} from "@angular/forms";
export enum Type { VERB, NOUN, PHRASE }

export enum Gender { MASCULINE, FEMININE }
    
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
        this.createdOn = createdOn || new Date().toDateString();
        this.definitions = definitions || [];
    }
    public isEmpty(): boolean {
        return this.term.length > 0 && !!this.type;
    }
    public static getAllTypes(): Array<string> {
        return [Type[Type.NOUN], Type[Type.PHRASE], Type[Type.VERB]];
    }
    public static getAllGenders(): Array<string> {
        return [Gender[Gender.FEMININE], Gender[Gender.MASCULINE]];
    }
    public withExtraFields(): Term {
        this.definitions = this.definitions.concat(new Definition())
            .map(definition => definition.withExtraFields());
        return this;
    }
    public getFormGroup(): FormGroup {
        return new FormGroup({
            id: new FormControl(this.id),
            type: new FormControl(this.type),
            term: new FormControl(this.term),
            gender: new FormControl(this.gender),
            createdOn: new FormControl(this.createdOn),
            comments: new FormControl(this.comments),
            definitions: new FormArray(this.definitions
                .map(definition => definition.getFormGroup()))
        });
    }
}
