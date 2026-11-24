export interface TascaApiResponse {
    id:number| string;
        nom: string;
        descripcioBreu?: string;
        titol?:string
        categoria: string;
        dataLimit?: string|Date;
        estat:string
        horesEstimades:number|string
        es_important: boolean;
}

export interface TasquesCercaResponse {
    tasques: TascaApiResponse[];
    total: number;
  }