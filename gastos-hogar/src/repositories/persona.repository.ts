import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Persona, PersonaRelations, Gasto} from '../models';
import {GastoRepository} from './gasto.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly gasto: HasOneRepositoryFactory<Gasto, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('GastoRepository') protected gastoRepositoryGetter: Getter<GastoRepository>,
  ) {
    super(Persona, dataSource);
    this.gasto = this.createHasOneRepositoryFactoryFor('gasto', gastoRepositoryGetter);
    this.registerInclusionResolver('gasto', this.gasto.inclusionResolver);
  }
}
