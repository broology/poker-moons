import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { CardOrientationTransformComponent } from './card-orientation-transform.component';
import { cardOrientationTransformImports } from './card-orientation-transform.module';

describe('CardOrientationTransformComponent', () => {
    let component: CardOrientationTransformComponent;
    let fixture: ComponentFixture<CardOrientationTransformComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: cardOrientationTransformImports,
            declarations: [CardOrientationTransformComponent],
            providers: [MockNgEnvironment],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CardOrientationTransformComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
