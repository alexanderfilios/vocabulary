import {FormGroup, FormControl} from "@angular/forms";
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
    public getFormGroup(): FormGroup {
        return new FormGroup({
            example: new FormControl(this.example),
            comments: new FormControl(this.comments)
        });
    }
}