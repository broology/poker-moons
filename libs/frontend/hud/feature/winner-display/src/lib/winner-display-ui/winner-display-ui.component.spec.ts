import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WinnerDisplayUiComponent } from './winner-display-ui.component';
import { winnerDisplayUiImports } from './winner-display-ui.module';

describe('WinnerDisplayUiComponent', () => {
    let component: WinnerDisplayUiComponent;
    let fixture: ComponentFixture<WinnerDisplayUiComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: winnerDisplayUiImports,
            declarations: [WinnerDisplayUiComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WinnerDisplayUiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
