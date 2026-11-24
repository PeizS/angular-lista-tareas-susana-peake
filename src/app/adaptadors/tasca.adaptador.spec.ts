import { adaptarTascaApi, adaptarTasquesApi } from './tasca.adaptador';
import { TascaApiResponse } from '../models/tasca-api.model';

describe('adaptarTascaApi', () => {
  const apiTasca: TascaApiResponse = {
    id: 'tasca-001',
    nom: '  Configurar entorn Angular 22  ',
    descripcioBreu: '  Revisar dependències  ',
    categoria: '  Desenvolupament  ',
    dataLimit: new Date('2026-11-25'),
    estat: 'Pendent',
    horesEstimades: 2,
    es_important: true,
  };

  it('neteja els espais en blanc amb trim()', () => {
    const adaptada = adaptarTascaApi(apiTasca);
    expect(adaptada.nom).toBe('Configurar entorn Angular 22');
    expect(adaptada.descripcio).toBe('Revisar dependències');
    expect(adaptada.categoria).toBe('Desenvolupament');
  });

  it('converteix valors numèrics amb seguretat', () => {
    const adaptada = adaptarTascaApi({
      ...apiTasca,
      horesEstimades: 'no-valid' as unknown as number,
    });
    expect(adaptada.horesEstimades).toBe(1);
  });

  it('aplica valors per defecte si falten camps opcionals', () => {
    const adaptada = adaptarTascaApi({
      ...apiTasca,
      id: '0',
      nom: 'Tasca mínima',
      descripcioBreu: '',
      categoria: '',
      es_important: false,
    });
    expect(adaptada.descripcio).toBe('Sense descripció');
    expect(adaptada.categoria).toBe('General');
    expect(adaptada.dataLimit).toBeInstanceOf(Date);
    expect(adaptada.esImportant).toBe(false);
  });

  it('adapta un array complet', () => {
    expect(
      adaptarTasquesApi([apiTasca, { ...apiTasca, id: 'tasca-002', nom: 'Altra' }])
    ).toHaveLength(2);
  });
});