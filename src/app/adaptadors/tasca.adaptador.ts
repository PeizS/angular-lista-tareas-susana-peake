import { TascaApiResponse } from '../models/tasca-api.model';
import { ElementTasca } from '../models/element.model';

const DATA_PER_DEFECTE = '2026-12-31';

function numeroSegur(valor: unknown, perDefecte = 1): number {
  const n = Number(valor);
  return Number.isFinite(n) && n >= 0 ? n : perDefecte;
}

function convertirDataSegura(valorData: string): Date {
  const dataParsejada = new Date(valorData);
  if (!Number.isNaN(dataParsejada.getTime())) {
    return dataParsejada;
  }
  return new Date(DATA_PER_DEFECTE);
}

export function adaptarTascaApi(apiTasca: TascaApiResponse): ElementTasca {
  const titolNet = (apiTasca.titol ?? '').trim() || 'Tasca sense títol';
  const descripcioNeta = (apiTasca.descripcioBreu ?? '').trim() || 'Sense descripció';
  const categoriaNeta = (apiTasca.categoria ?? '').trim() || 'General';
  const dataNeta = String(apiTasca.dataLimit ?? '').trim() || DATA_PER_DEFECTE;
  const esImportant = apiTasca.es_important === true;

  return {
    id: String(apiTasca.id).trim(),
    nom: titolNet, // Si tu interfaz ElementTasca usa 'nom' en lugar de 'titol', cámbialo aquí a `nom: titolNet`
    descripcio: descripcioNeta,
    categoria: categoriaNeta,
    dataLimit: convertirDataSegura(dataNeta),
    estat: 'Pendent',
    horesEstimades: numeroSegur(apiTasca.horesEstimades, 1),
    esImportant
    
  };
}

export function adaptarTasquesApi(apiTasques: TascaApiResponse[]): ElementTasca[] {
  if (!Array.isArray(apiTasques)) {
    return [];
  }
  return apiTasques.map(adaptarTascaApi);
}

