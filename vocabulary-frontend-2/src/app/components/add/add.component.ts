/**
 * Created by alexandrosfilios on 26/12/16.
 */
import { Component } from '@angular/core';
import {TermModel} from "../../shared/models/term-model";

@Component({

    selector: 'vocabulary-add',
    templateUrl: './add.component.html',

})

export class AddComponent {

    constructor (private termModel: TermModel) {
        termModel.fetchTerms()
            .subscribe(console.log);
    }

}
