import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoundUiComponent } from './sound-ui.component';
import { soundUiImports } from './sound-ui.module';

describe('SoundUiComponent', () => {
    let component: SoundUiComponent;
    let fixture: ComponentFixture<SoundUiComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: soundUiImports,
            declarations: [SoundUiComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SoundUiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
