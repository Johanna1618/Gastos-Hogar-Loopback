import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Gasto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_gasto: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Gasto>) {
    super(data);
  }
}

export interface GastoRelations {
  // describe navigational properties here
}

export type GastoWithRelations = Gasto & GastoRelations;
