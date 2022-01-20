import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendHudShellComponent } from './frontend-hud-shell.component';

describe('FrontendHudShellComponent', () => {
    let component: FrontendHudShellComponent;
    let fixture: ComponentFixture<FrontendHudShellComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FrontendHudShellComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FrontendHudShellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
