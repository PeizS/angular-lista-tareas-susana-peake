export interface Tasca {
    id: number;
    titol: string;
    descripcioBreu: string;
    categoria: string;
    dataLimit: string;     // Data 
    horesEstimades: number; // Camp numèric 
    es_important: boolean;     // Camp booleà 
  }