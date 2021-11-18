export interface TeamUsers {
    IdTipoUsuario:number;
    IdEquipo: number;
    Nombre: string;
    TipoUsuario: string;
    NumeroMiembros: number;
    ImagenEquipo:string;
}

export interface TeamsUserProfile {
    IdUsuarioCreador: number;
    TipoUsuario: TipoUsuario[];
    NombreEquipo: string;
    Descripcion: string;
    Genero: Genero[];
    IdActivaInvitacion: string;
    TipoEquipo: TipoEquipo[];
    EdadPromedio: EdadPromedio[];
}

export interface Deport {
    IdDeporte: number;
    NombreDeporte: string;
    Vigencia: number;
}

export interface EdadPromedio {
    IdEdadPromedio: number;
    EdadPromedio: string;
}

export interface Genero {
    IdGenero: number;
    Descripcion: string;
}

export interface TipoEquipo {
    IdTipoEquipo: number;
    Descripcion: string;
    Vigencia: number;
}

export interface TipoUsuario {
    IdRolJugador: number;
    Descripcion: string;
    vigencia: number;
}

export interface TypeTeam {
    IdTipoEquipo: number;
    Descripcion: string;
    Vigencia: number;
}


export interface ageAverage {
    IdEdadPromedio: number;
    EdadPromedio: string;
}


export interface Genders {
    IdGenero: number;
    Descripcion: string;
    Vigencia: number;
}

export interface GendersTeam {
    IdGeneroEquipo: number;
    Descripcion: string;
}

export interface Region {
    IdRegion: number;
    IdPais: number;
    Descripcion: string;
    Vigencia: number;
}

export interface listDeportsFavorite {
    DeportesFavEquipo: DeportsFavorite[];
}

export interface DeportsFavorite {
    IdDeporte: number;
    NombreDeporte: string;
}

export interface listMembers {
    IdEquipo:           number;
    IdUsuario:          number;
    NombreUsuario:      string;
    ImagenUsuario:      string;
    IdRolJugadorEquipo: number;
    RolJugadorEquipo:   string;
    IdStatusInvitacion: number;
    StatusInvitacion:   string;
}




