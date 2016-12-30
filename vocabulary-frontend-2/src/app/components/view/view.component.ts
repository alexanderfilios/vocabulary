/**
 * Created by alexandrosfilios on 30/12/16.
 */
import {Component} from "@angular/core";
import {TermModel} from "../../shared/models/term-model";
import {Term} from "../../shared/entities/term";
import {Constants} from "../../shared/Constants";

@Component({

    selector: 'vocabulary-view',
    styleUrls: ['./view.component.css'],
    templateUrl: './view.component.html'

})

export class ViewComponent {

    public terms: Array<Term>;
    public termDeleted: Term;
    public termRestored: Term;
    public restoreSuccess: boolean = false;
    public deleteSuccess: boolean = false;

    public linkToPaper: string = Constants.BASE_URL + 'paper';
    
    constructor(public termModel: TermModel) {
        const self = this;
        self.termDeleted = null;
        termModel.fetchTerms()
            .subscribe(
                terms => { self.terms = terms.sort((t1, t2) => (t1.term > t2.term) ? 1 : -1); },
                () => { self.terms = []; }
            );
    }
    public restore(term: Term): void {
        const self = this;
        self.termDeleted = null;
        term.id = 0;
        self.termModel.saveTerm(term)
            .subscribe((id) => {
                    term.id = id;
                    self.terms = self.terms
                        .concat(term)
                        .sort((t1, t2) => (t1.term > t2.term) ? 1 : -1);
                    self.restoreSuccess = true;
                    self.termRestored = term;
                },
                () => {
                    self.termRestored = term;
                    self.restoreSuccess = false;
                });
    }
    public delete(term: Term): void {
        const self = this;
        self.termRestored = null;
        self.termModel.deleteTerm(term.id)
            .subscribe(() => {
                    self.terms = self.terms
                        .filter(t => t.id !== term.id);
                    self.deleteSuccess = true;
                    self.termDeleted = term;
                },
                () => {
                    self.deleteSuccess = false;
                    self.termDeleted = null;
                });
    }

}
