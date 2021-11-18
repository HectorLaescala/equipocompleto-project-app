export interface Profile {
    IdTipoUsuario?: number;
    IdUsuario?: number;
    NombreUsuario?: string;
    Token?: string;
}

export interface authResponse {
    code: boolean;
    token: string | null;
}

export interface Deport {
    IdDeporte: number;
    NombreDeporte: string;
    Vigencia: number;
}

export interface DeportsUser {
    IdDeporte: number;
    NombreDeporte: string;
}

export interface DeportsFavorite {
    IdUsuario: number;
    DeportesFavoritos: DeportsUser[];
}

export interface Genders {
    IdGenero:    number;
    Descripcion: string;
    Vigencia:    number;
}

export interface Region {
    IdRegion:    number;
    IdPais:      number;
    Descripcion: string;
    Vigencia:    number;
}

