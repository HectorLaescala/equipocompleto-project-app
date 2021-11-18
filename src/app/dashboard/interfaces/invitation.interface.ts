export interface ListPlayer {
    IdUsuario: number;
    NombreUsuario: string;
    TipoUsuario: TipoUsuario;
    ImagenUsuario: string;
    IdStatusInvitacion: number;
    StatusInvitacion: null;
}

export interface ListTeams {
    IdEquipo: number;
    NombreEquipo: string;
    ImagenEquipo: string;
    IdEstadoInvitacionEquipo: number;
    NumeroMiembros: number;
    StatusInvitacion: null;
}

export interface TipoUsuario {
    IdTipoUsuario: number;
    Descripcion: string;
}



export interface detailTeam {
    NombreEquipo: string;
    Descripcion: string;
    ImagenEquipo: string;
    NumeroMiembros: number;
    GeneroEquipo: string;
    DeportesFavoritos: deportsFavorites[];
    AceptaInvitacion: string;
    EdadPromedio: string;
    TipoEquipo: string;
}

export interface deportsFavorites {
    IdDeporte: number;
    NombreDeporte: string;
}

export interface CarouselInvitationTeams {
    IdInvitacionEquipo: number;
    IdUsuario: number;
    IdUsuarioCreador: number;
    IdEquipo: number;
    IdRolJugador: number;
    IdEstadoinvitacion: number;
    Descripcion: string;
    NombreEquipo: string;
    NumeroMiembros: number;
    ImagenEquipo: string;

}

export interface carouselInvitationPlayers {
    IdInvitacionUsuario: number;
    IdUsuario: number;
    NombreUsuario: string;
    IdEquipo: number;
    IdEstadoinvitacion: number;
    Descripcion: string;
    NombreEquipo: string;
    NumeroMiembros: number;
    ImagenUsuario: string;
}

export interface listInvitationNewPlayers {
    IdInvitacionUsuario: number;
    IdUsuario: number;
    NombreUsuario: string;
    IdEquipo: number;
    IdEstadoinvitacion: number;
    Descripcion: string;
    NombreEquipo: string;
    NumeroMiembros: number;
    ImagenUsuario: string;
}
