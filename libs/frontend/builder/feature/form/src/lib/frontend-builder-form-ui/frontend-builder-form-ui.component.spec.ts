import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontendBuilderFormUiComponent } from './frontend-builder-form-ui.component';
import { frontendBuilderFormUiImports } from './frontend-builder-form-ui.module';

describe('FrontendBuilderFormUiComponent', () => {
    let component: FrontendBuilderFormUiComponent;
    let fixture: ComponentFixture<FrontendBuilderFormUiComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: frontendBuilderFormUiImports,
            declarations: [FrontendBuilderFormUiComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FrontendBuilderFormUiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
