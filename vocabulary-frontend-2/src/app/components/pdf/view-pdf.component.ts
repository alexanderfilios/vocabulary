/**
 * Created by alexandrosfilios on 31/12/16.
 */
import { Component } from '@angular/core';
import {Constants} from "../../shared/Constants";

@Component({

    selector: 'vocabulary-view-pdf',
    templateUrl: 'view-pdf.component.html'

})

export class ViewPdfComponent {

    public linkToPaper: string = Constants.BASE_URL + 'paper';
    
    constructor () {}

}
