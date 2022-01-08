import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PotComponent } from './pot.component';
import { potModuleImports } from './pot.module';

describe('PotComponent', () => {
    let component: PotComponent;
    let fixture: ComponentFixture<PotComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: potModuleImports,
            declarations: [PotComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PotComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
