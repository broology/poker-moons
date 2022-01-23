import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { ChipStackComponent } from './chip-stack.component';
import { chipStackImports } from './chip-stack.module';

describe('ChipStackComponent', () => {
    let component: ChipStackComponent;
    let fixture: ComponentFixture<ChipStackComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: chipStackImports,
            declarations: [ChipStackComponent],
            providers: [MockNgEnvironment],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChipStackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
