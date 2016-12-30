import {FormGroup, FormBuilder} from "@angular/forms";
/**
 * Created by alexandrosfilios on 30/10/16.
 */
export class Example {
    public example: string;
    public comments: string;
    constructor(example?: string,
                comments?: string) {
        this.example = example || '';
        this.comments = comments || '';
    }
    public isEmpty(): boolean {
        return (!this.example || this.example.length === 0)
            && (!this.comments || this.comments.length === 0);
    }
    public withExtraFields(): Example {
        return this;
    }
    public getFormGroup(formBuilder: FormBuilder): FormGroup {
        return formBuilder.group({
            example: formBuilder.control(this.example),
            comments: formBuilder.control(this.comments)
        });
    }
}