import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-table-display-community-cards',
    templateUrl: './community-cards.component.html',
    styleUrls: ['./community-cards.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCardsComponent {
    @Input() cards: Card[] = [];
}
