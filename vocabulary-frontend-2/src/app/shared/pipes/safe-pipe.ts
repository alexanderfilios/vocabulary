import {DomSanitizer} from "@angular/platform-browser";
import {PipeTransform, Pipe} from "@angular/core";
/**
 * Created by alexandrosfilios on 30/12/16.
 */

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
} 