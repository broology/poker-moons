import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendTableShellComponent } from './frontend-table-shell.component';

describe('FrontendTableShellComponent', () => {
    let component: FrontendTableShellComponent;
    let fixture: ComponentFixture<FrontendTableShellComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FrontendTableShellComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FrontendTableShellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
