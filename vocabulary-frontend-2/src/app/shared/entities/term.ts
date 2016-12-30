/**
 * Created by alexandrosfilios on 30/10/16.
 */

import {Definition} from "./definition";
import {FormGroup, FormBuilder} from "@angular/forms";
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
    public getFormGroup(formBuilder: FormBuilder): FormGroup {
        return formBuilder.group({
            id: formBuilder.control(this.id),
            type: formBuilder.control(this.type),
            term: formBuilder.control(this.term),
            gender: formBuilder.control(this.gender),
            createdOn: formBuilder.control(this.createdOn),
            comments: formBuilder.control(this.comments),
            definitions: formBuilder.array(this.definitions
                .map(definition => definition.getFormGroup(formBuilder)))
        });
    }
}
