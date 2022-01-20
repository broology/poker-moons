import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InActiveControlsComponent } from './in-active-controls.component';
import { inActiveControlsImports } from './in-active-controls.module';

describe('InActiveControlsComponent', () => {
    let component: InActiveControlsComponent;
    let fixture: ComponentFixture<InActiveControlsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: inActiveControlsImports,
            declarations: [InActiveControlsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InActiveControlsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
