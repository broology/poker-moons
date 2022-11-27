import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SoundFeatureComponent } from './sound-feature.component';
import { soundFeatureImports } from './sound-feature.module';

describe('SoundFeatureComponent', () => {
    let component: SoundFeatureComponent;
    let fixture: ComponentFixture<SoundFeatureComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: soundFeatureImports,
            declarations: [SoundFeatureComponent],
            providers: [provideMockStore()],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SoundFeatureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
