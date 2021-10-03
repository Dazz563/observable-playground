import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { take } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class LoadingSpinner {
    public isLoading = false;

    setLoadingSpinner(observable: Observable<any>) {
        this.isLoading = true;
        observable.pipe(take(1)).subscribe(() => this.isLoading = false);
    }

}