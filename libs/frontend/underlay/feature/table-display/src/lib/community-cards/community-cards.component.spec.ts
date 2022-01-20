import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunityCardsComponent } from './community-cards.component';
import { communityCardsModuleImports } from './community-cards.module';

describe('CommunityCardsComponent', () => {
    let component: CommunityCardsComponent;
    let fixture: ComponentFixture<CommunityCardsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: communityCardsModuleImports,
            declarations: [CommunityCardsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CommunityCardsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
