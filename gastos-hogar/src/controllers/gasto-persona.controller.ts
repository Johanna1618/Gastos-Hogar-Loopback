import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Gasto,
  Persona,
} from '../models';
import {GastoRepository} from '../repositories';

export class GastoPersonaController {
  constructor(
    @repository(GastoRepository)
    public gastoRepository: GastoRepository,
  ) { }

  @get('/gastos/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Gasto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Gasto.prototype.id,
  ): Promise<Persona> {
    return this.gastoRepository.persona(id);
  }
}
