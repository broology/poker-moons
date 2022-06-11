import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HudFrameComponent } from './hud-frame.component';
import { hudFrameImports } from './hud-frame.module';

describe('HudFrameComponent', () => {
    let component: HudFrameComponent;
    let fixture: ComponentFixture<HudFrameComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: hudFrameImports,
            declarations: [HudFrameComponent],
            providers: [provideMockStore()],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HudFrameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
