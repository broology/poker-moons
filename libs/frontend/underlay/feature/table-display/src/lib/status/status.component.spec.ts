import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusComponent } from './status.component';
import { statusModuleImports } from './status.module';

describe('StatusComponent', () => {
    let component: StatusComponent;
    let fixture: ComponentFixture<StatusComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: statusModuleImports,
            declarations: [StatusComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
