import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LobbyCountDownComponent } from './lobby-count-down.component';
import { lobbyCountDownImports } from './lobby-count-down.module';

describe('LobbyCountDownComponent', () => {
    let component: LobbyCountDownComponent;
    let fixture: ComponentFixture<LobbyCountDownComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: lobbyCountDownImports,
            declarations: [LobbyCountDownComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LobbyCountDownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
