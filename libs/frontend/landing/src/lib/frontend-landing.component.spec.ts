import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { FrontendLandingComponent } from './frontend-landing.component';
import { frontendLandingImports } from './frontend-landing.module';
import { TableBuilderStore } from './store/table-builder.store';

describe('FrontendLandingComponent', () => {
    let component: FrontendLandingComponent;
    let fixture: ComponentFixture<FrontendLandingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, ...frontendLandingImports],
            providers: [TableBuilderStore, MockNgEnvironment],
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
