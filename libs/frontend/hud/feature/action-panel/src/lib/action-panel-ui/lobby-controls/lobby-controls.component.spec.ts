import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LobbyControlsComponent } from './lobby-controls.component';
import { lobbyControlsImports } from './lobby-controls.module';

describe('LobbyControlsComponent', () => {
    let component: LobbyControlsComponent;
    let fixture: ComponentFixture<LobbyControlsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: lobbyControlsImports,
            declarations: [LobbyControlsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LobbyControlsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
