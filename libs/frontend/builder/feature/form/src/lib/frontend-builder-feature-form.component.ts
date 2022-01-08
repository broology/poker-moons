import { Component } from '@angular/core';
import { CreateTableRequest } from '@poker-moons/shared/type';
import { FrontendBuilderStore } from './store/frontend-builder.store';

@Component({
    selector: 'poker-moons-frontend-builder-feature-form',
    templateUrl: './frontend-builder-feature-form.component.html',
    styleUrls: ['./frontend-builder-feature-form.component.scss'],
})
export class FrontendBuilderFeatureFormComponent {
    readonly loading$ = this.frontendBuilderStore.loading$;

    constructor(private readonly frontendBuilderStore: FrontendBuilderStore) {}

    createTable(dto: CreateTableRequest): void {
        this.frontendBuilderStore.createTable(dto);
    }
}
