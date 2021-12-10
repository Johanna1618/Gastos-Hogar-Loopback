import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Gasto, GastoRelations} from '../models';

export class GastoRepository extends DefaultCrudRepository<
  Gasto,
  typeof Gasto.prototype.id,
  GastoRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Gasto, dataSource);
  }
}
