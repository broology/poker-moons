import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableStateFacade } from '@poker-moons/frontend/shared/state/table';
import { mock } from 'jest-mock-extended';
import { FrontendUnderlayShellComponent } from './frontend-underlay-shell.component';

describe('FrontendUnderlayShellComponent', () => {
    let component: FrontendUnderlayShellComponent;
    let fixture: ComponentFixture<FrontendUnderlayShellComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FrontendUnderlayShellComponent],
            providers: [{ provide: TableStateFacade, useValue: mock() }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FrontendUnderlayShellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
