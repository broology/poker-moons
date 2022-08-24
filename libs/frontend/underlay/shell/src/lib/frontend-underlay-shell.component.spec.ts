import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableStateFacade } from '@poker-moons/frontend/shared/state/table';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { mock } from 'jest-mock-extended';
import { FrontendUnderlayShellComponent } from './frontend-underlay-shell.component';
import { frontendUnderlayShellImports } from './frontend-underlay-shell.module';

describe('FrontendUnderlayShellComponent', () => {
    let component: FrontendUnderlayShellComponent;
    let fixture: ComponentFixture<FrontendUnderlayShellComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: frontendUnderlayShellImports,
            declarations: [FrontendUnderlayShellComponent],
            providers: [{ provide: TableStateFacade, useValue: mock() }, MockNgEnvironment],
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
