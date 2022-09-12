import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { WinnerDisplayFeatureComponent } from './winner-display-feature.component';
import { winnerDisplayFeatureImports } from './winner-display-feature.module';

describe('WinnerDisplayFeatureComponent', () => {
    let component: WinnerDisplayFeatureComponent;
    let fixture: ComponentFixture<WinnerDisplayFeatureComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: winnerDisplayFeatureImports,
            declarations: [WinnerDisplayFeatureComponent],
            providers: [provideMockStore()],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WinnerDisplayFeatureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
