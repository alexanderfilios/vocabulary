import {Example} from "./example";
import {Term} from "./term";
import {FormBuilder, FormGroup} from "@angular/forms";
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
    public getFormGroup(formBuilder: FormBuilder): FormGroup {
        return formBuilder.group({
            definition: formBuilder.control(this.definition),
            synonyms: formBuilder.control(this.synonyms),
            antonyms: formBuilder.control(this.antonyms),
            comments: formBuilder.control(this.comments),
            examples: formBuilder.array(this.examples.map(example => example.getFormGroup(formBuilder)))
        });
    }
}