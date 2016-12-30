/**
 * Created by alexandrosfilios on 26/12/16.
 */
import { Component } from '@angular/core';
import {TermModel} from "../../shared/models/term-model";
import {Term, Type, Gender} from "../../shared/entities/term";
import {Router, ActivatedRoute} from "@angular/router";
import {Definition} from "../../shared/entities/definition";
import {Example} from "../../shared/entities/example";
import {FormGroup, FormBuilder, FormArray} from "@angular/forms";

@Component({

    selector: 'vocabulary-add',
    styleUrls: ['./add.component.css'],
    templateUrl: './add.component.html'

})

export class AddComponent {

    public termForm: FormGroup;
    public term: Term;
    public termSubmitted: Term;
    public existingTerms: Array<{[key: string]: string}>;
    public TERM_TYPES: Array<string>;
    public NOUN_GENDERS: Array<string>;
    public termNotFound: boolean;
    public submitSuccess: boolean;
    public Type = Type;
    public Gender = Gender;


    ngOnInit() {
        this.termForm = this.term.getFormGroup(this._formBuilder);
    }

    constructor(private _formBuilder: FormBuilder, public termModel: TermModel) {
        const self = this;
        self.term = new Term().withExtraFields();

        self.termSubmitted = null;
        self.TERM_TYPES = Term.getAllTypes();
        self.NOUN_GENDERS = Term.getAllGenders();
        self.termNotFound = false;
        termModel.fetchExistingTerms()
            .subscribe(terms => self.existingTerms = terms);
        // route.queryParams.subscribe(params => {
        //         if ('id' in params) {
        //             termModel.fetchTermById(Number.parseInt(params['id']))
        //                 .subscribe(term => self.term = term.withExtraFields());
        //         }
        //     });
    }
    public checkType(): void {
        const articles = ['le ', 'la ', 'l\'', 'les'];
        if (articles.some(nounPrefix => this.term.term.startsWith(nounPrefix))) {
            const article = articles
                .find(article => this.term.term.startsWith(article)).trim();
            this.term.type = Type.NOUN;
            this.term.term = this.term.term.substr(article.length).trim();
            if (article === 'le') {
                this.term.gender = Gender.MASCULINE;
            } else if (article === 'la') {
                this.term.gender = Gender.FEMININE;
            }
        } else if(['se ', 's\''].some(verbPrefix => this.term.term.startsWith(verbPrefix))) {
            this.term.type = Type.VERB;
        }
    }
    public onTypeDefinition(): void {
        console.log(this.termForm.getRawValue());
        const emptyDefinitionIndices: Array<number> = this.term.definitions
            .map((definition, index) => definition.isEmpty() ? index : null)
            .filter(definitionIndex => definitionIndex !== null);
        if (emptyDefinitionIndices.length === 0) {
            // If we have filled all definitions, then add one more definition field
            this.addDefinition();
        } else if (emptyDefinitionIndices.length > 1) {
            // We keep the first empty definition
            this.removeDefinitions(emptyDefinitionIndices.slice(1));
        }
        console.log(this.term);
    }
    private addDefinition(): void {
        const newDefinition = new Definition().withExtraFields();
        const definitionArrayCtrl = <FormArray>this.termForm.controls['definitions'];

        this.term.definitions.push(newDefinition);
        definitionArrayCtrl.push(newDefinition.getFormGroup(this._formBuilder));
    }
    private removeDefinitions(indicesToRemove: Array<number>): void {
        const definitionArrayCtrl = <FormArray>this.termForm.controls['definitions'];
        indicesToRemove.forEach(definitionIndex => { definitionArrayCtrl.removeAt(definitionIndex); })

        this.term.definitions = this.term.definitions
            .filter((definition, index) => indicesToRemove.indexOf(index) < 0);
    }
    public onTypeExample(definitionIndex: number): void {
        const emptyExampleIndices: Array<number> = this.term.definitions[definitionIndex].examples
            .map((example, index) => example.isEmpty() ? index : null)
            .filter(exampleIndex => exampleIndex !== null);
        if (emptyExampleIndices.length === 0) {
            // If we have filled all examples, then add one more example field
            this.addExample(definitionIndex);
        } else if (emptyExampleIndices.length > 1) {
            // We keep the first empty example
            this.removeExamples(definitionIndex, emptyExampleIndices.slice(1));
        }
    }
    private addExample(definitionIndex: number): void {
        const newExample = new Example().withExtraFields();
        const definitionArrayCtrl = <FormArray>this.termForm.controls['definitions'];
        const exampleArrayCtrl = <FormArray>(<FormArray>definitionArrayCtrl.controls[definitionIndex]).controls['examples'];

        this.term.definitions[definitionIndex].examples.push(newExample);
        exampleArrayCtrl.push(newExample.getFormGroup(this._formBuilder));
    }
    private removeExamples(definitionIndex: number, indicesToRemove: Array<number>): void {
        const definitionArrayCtrl = <FormArray>this.termForm.controls['definitions'];
        const exampleArrayCtrl = <FormArray>(<FormArray>definitionArrayCtrl.controls[definitionIndex]).controls['examples'];

        indicesToRemove.forEach(exampleIndex => { exampleArrayCtrl.removeAt(exampleIndex); });
        this.term.definitions[definitionIndex].examples = this.term.definitions[definitionIndex].examples
            .filter((example, index) => indicesToRemove.indexOf(index) < 0);

    }
    public save(): void {
        this.termModel.saveTerm(this.term)
            .subscribe(() => {
                this.termSubmitted = this.term;
                this.submitSuccess = true;
                this.term = new Term().withExtraFields();
            },
                () => {
                this.termSubmitted = this.term;
                this.submitSuccess = false;
            });
    }
    public loadTerm(): void {
        const self = this;
        if (self.existingTerms.map(term => term['term']).indexOf(self.term.term) >= 0) {
            self.termModel.fetchTermByName(self.term.term)
                .subscribe(
                    term => self.term = term.withExtraFields(),
                    () => self.term = new Term().withExtraFields());
        }
    }
    public clear(): void {
        this.term = new Term().withExtraFields();
    }

}
