import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Persona,
  Gasto,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaGastoController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/gasto', {
    responses: {
      '200': {
        description: 'Persona has one Gasto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Gasto),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Gasto>,
  ): Promise<Gasto> {
    return this.personaRepository.gasto(id).get(filter);
  }

  @post('/personas/{id}/gasto', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Gasto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gasto, {
            title: 'NewGastoInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) gasto: Omit<Gasto, 'id'>,
  ): Promise<Gasto> {
    return this.personaRepository.gasto(id).create(gasto);
  }

  @patch('/personas/{id}/gasto', {
    responses: {
      '200': {
        description: 'Persona.Gasto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gasto, {partial: true}),
        },
      },
    })
    gasto: Partial<Gasto>,
    @param.query.object('where', getWhereSchemaFor(Gasto)) where?: Where<Gasto>,
  ): Promise<Count> {
    return this.personaRepository.gasto(id).patch(gasto, where);
  }

  @del('/personas/{id}/gasto', {
    responses: {
      '200': {
        description: 'Persona.Gasto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Gasto)) where?: Where<Gasto>,
  ): Promise<Count> {
    return this.personaRepository.gasto(id).delete(where);
  }
}
