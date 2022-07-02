import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FrontendLandingComponent } from './frontend-landing.component';
import { frontendLandingImports } from './frontend-landing.module';

describe('FrontendLandingComponent', () => {
    let component: FrontendLandingComponent;
    let fixture: ComponentFixture<FrontendLandingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: frontendLandingImports,
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
