import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontendLandingComponent } from './frontend-landing.component';
import { frontendLandingImports } from './frontend-landing.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('FrontendLandingComponent', () => {
    let component: FrontendLandingComponent;
    let fixture: ComponentFixture<FrontendLandingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, ...frontendLandingImports],
            declarations: [FrontendLandingComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FrontendLandingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
