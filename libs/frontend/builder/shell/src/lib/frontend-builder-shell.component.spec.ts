import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontendBuilderShellComponent } from './frontend-builder-shell.component';

describe('FrontendBuilderShellComponent', () => {
    let component: FrontendBuilderShellComponent;
    let fixture: ComponentFixture<FrontendBuilderShellComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FrontendBuilderShellComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FrontendBuilderShellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
