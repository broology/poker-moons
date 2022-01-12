import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TableDisplayFeatureComponent } from './table-display-feature.component';
import { tableDisplayFeatureImports } from './table-display-feature.module';

describe('TableDisplayFeatureComponent', () => {
    let component: TableDisplayFeatureComponent;
    let fixture: ComponentFixture<TableDisplayFeatureComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: tableDisplayFeatureImports,
            declarations: [TableDisplayFeatureComponent],
            providers: [provideMockStore()],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TableDisplayFeatureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
