import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { CardComponent } from './card.component';
import { cardImports } from './card.module';

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: cardImports,
            declarations: [CardComponent],
            providers: [MockNgEnvironment],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
