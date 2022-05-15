import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { DepthTransformComponent } from './depth-transform.component';
import { depthTransformImports } from './depth-transform.module';

describe('DepthTransformComponent', () => {
    let component: DepthTransformComponent;
    let fixture: ComponentFixture<DepthTransformComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: depthTransformImports,
            declarations: [DepthTransformComponent],
            providers: [MockNgEnvironment],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DepthTransformComponent);
        component = fixture.componentInstance;
        component.depth = 'front';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
