import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Card } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-table-display-community-cards',
    templateUrl: './community-cards.component.html',
    styleUrls: ['./community-cards.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCardsComponent implements OnChanges {
    @Input() cards!: Card[];

    ngOnChanges(changes: SimpleChanges): void {
        //TODO Animation

        return;
    }
}
