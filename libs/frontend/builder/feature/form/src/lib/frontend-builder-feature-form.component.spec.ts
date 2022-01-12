import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FrontendBuilderFeatureFormComponent } from './frontend-builder-feature-form.component';
import { frontendBuilderFormFeatureImports } from './frontend-builder-feature-form.module';
import { FrontendBuilderStore } from './store/frontend-builder.store';

describe('FrontendBuilderFeatureFormComponent', () => {
    let component: FrontendBuilderFeatureFormComponent;
    let fixture: ComponentFixture<FrontendBuilderFeatureFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: frontendBuilderFormFeatureImports,
            declarations: [FrontendBuilderFeatureFormComponent],
            providers: [
                {
                    provide: FrontendBuilderStore,
                    useValue: {
                        loading$: of(false),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FrontendBuilderFeatureFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
