import { Component } from '@angular/core';
import { TableBuilderStore } from './store/table-builder.store';

@Component({
    selector: 'poker-moons-frontend-landing',
    templateUrl: './frontend-landing.component.html',
    styleUrls: ['./frontend-landing.component.scss'],
})
export class FrontendLandingComponent {
    constructor(private readonly builderStore: TableBuilderStore) {}

    createTable() {
        return this.builderStore.createTable();
    }
}
