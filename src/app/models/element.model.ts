export type EstatTasca = 'Pendent' | 'En curs' | 'Completada';

export interface ElementTasca {
    id: string;
    nom: string;
    descripcio: string;
    categoria: string;
    dataLimit: Date;
    estat:EstatTasca
    horesEstimades:number
    esImportant: boolean;
   
  }
  export type EstatServei = 'inicial' | 'carregant' | 'exit' | 'error';

export interface EstatTasques {
  estat: EstatServei;
  tasques: ElementTasca[];
  error?: string;
}
export interface CercaDesada {
  terme: string;
  categoria: string;
  data: string;   // ISO 8601, moment en què es va fer
}