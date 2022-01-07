import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableDisplayFeatureComponent } from './table-display-feature.component';

describe('TableDisplayFeatureComponent', () => {
    let component: TableDisplayFeatureComponent;
    let fixture: ComponentFixture<TableDisplayFeatureComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TableDisplayFeatureComponent],
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
