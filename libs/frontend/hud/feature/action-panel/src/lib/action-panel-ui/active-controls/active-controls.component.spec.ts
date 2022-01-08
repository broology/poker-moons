import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveControlsComponent } from './active-controls.component';
import { activeControlsImports } from './active-controls.module';

describe('ActiveControlsComponent', () => {
    let component: ActiveControlsComponent;
    let fixture: ComponentFixture<ActiveControlsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: activeControlsImports,
            declarations: [ActiveControlsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ActiveControlsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
