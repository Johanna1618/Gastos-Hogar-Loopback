import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Gasto, GastoRelations, Persona} from '../models';
import {PersonaRepository} from './persona.repository';

export class GastoRepository extends DefaultCrudRepository<
  Gasto,
  typeof Gasto.prototype.id,
  GastoRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Gasto.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Gasto, dataSource);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
