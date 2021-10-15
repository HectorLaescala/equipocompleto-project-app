import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPlayersTeams'
})
export class FilterPlayersTeamsPipe implements PipeTransform {

  transform(array: any[], text: string = '', column:string='NombreUsuario'): any[] {

    if (text === '') {
      return array;
    }

    if (!array) {
      return array;
    }

    text = text.toLocaleLowerCase();

    return array.filter(
      item => item[column].toLowerCase().includes(text)
    );
  }

}
