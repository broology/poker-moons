import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpectatorControlsComponent } from './spectator-controls.component';
import { spectatorControlsImports } from './spectator-controls.module';

describe('SpectatorControlsComponent', () => {
    let component: SpectatorControlsComponent;
    let fixture: ComponentFixture<SpectatorControlsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: spectatorControlsImports,
            declarations: [SpectatorControlsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SpectatorControlsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
