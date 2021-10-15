import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeportsFavorite } from 'src/app/dashboard/interfaces/team.interface';

@Component({
  selector: 'app-list-deports-favorites',
  templateUrl: './list-deports-favorites.component.html',
  styleUrls: ['./list-deports-favorites.component.scss'],
})
export class ListDeportsFavoritesComponent implements OnInit {

  @Input() deportsFavorite: DeportsFavorite[] = [];
  @Output() removeDeportsFavorite = new EventEmitter<{ IdDeporte: number, NombreDeporte: string }>();

  constructor() { }

  ngOnInit() {
  }

   getRemoveTeamDeport(IdDeporte: number, NombreDeporte: string) {
    this.removeDeportsFavorite.emit({ IdDeporte, NombreDeporte });
  }
}
