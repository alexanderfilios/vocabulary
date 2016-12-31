import {Example} from "./example";
import {FormGroup, FormControl, FormArray} from "@angular/forms";
/**
 * Created by alexandrosfilios on 30/10/16.
 */

// export class Synonym {
//     constructor(public synonym: string) {}
// }
// export class Antonym {
//     constructor(public antonym: string) {}
// }
export class Definition {
    public definition: string;
    public synonyms: Array<string>;
    public antonyms: Array<string>;
    public comments: string;
    public examples: Array<Example>;
    constructor(definition?: string,
                synonyms?: Array<string>,
                antonyms?: Array<string>,
                comments?: string,
                examples?: Array<Example>) {
        this.definition = definition || '';
        this.synonyms = (synonyms || []);
        this.antonyms = (antonyms || []);
        this.comments = comments || '';
        this.examples = examples || [];
    }

    public isEmpty(): boolean {
        return (!this.definition || this.definition.length === 0)
            && (!this.synonyms || this.synonyms.length === 0)
            && (!this.antonyms || this.antonyms.length === 0)
            && (!this.comments || this.comments.length === 0)
            && (!this.examples || !this.examples.some(example => !example.isEmpty()));
    }
    
    public withExtraFields(): Definition {
        this.examples = this.examples.concat(new Example)
            .map(example => example.withExtraFields());
        return this;
    }
    public getFormGroup(): FormGroup {
        return new FormGroup({
            definition: new FormControl(this.definition),
            synonyms: new FormControl(this.synonyms),
            antonyms: new FormControl(this.antonyms),
            comments: new FormControl(this.comments),
            examples: new FormArray(this.examples.map(example => example.getFormGroup()))
        });
    }
}