import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Ordering, SortDirection } from './ordering';
/*<%#*/
import { Project } from './mongo/mongo.entity';
/*%>*/
/*<%- `import { ${serviceNode.model.name} } from './entities/${serviceNode.baseName}.entity';` %>*/

class FindAllOptions {
  orderBy?: Ordering[];
  first?: number;
  after?: string;
  last?: number;
  before?: string;
}

/**
 * <%- serviceNode.model.description %>
 */
/*<%#*/
@Injectable()
export class MongoService {
  constructor(
    @InjectModel(Project)
    private readonly projectModel: ReturnModelType<typeof Project>
  ) {
  }
/*%>*/
/*<%_ _%>
@Injectable()
export class <%- serviceNode.model.name %>Service {
  constructor(
    @InjectModel(<%- serviceNode.model.name %>)
    private readonly <%- serviceNode.identifier %>Model: ReturnModelType<typeof <%- serviceNode.model.name %>>
  ) {}
<%_ _%>*/

/*<%#*/
  async findOneProject(id?: ObjectId | string, slug?: string): Promise<Project | null> {
    if (id != null) {
      return await this.projectModel.findOne({_id: id});
    } else {
      return await this.projectModel.findOne({slug: slug});
    }
  }

  async findAllProjects(options: FindAllOptions = {}): Promise<Project[]> {
    let stmt = this.projectModel.find();
    if (options.orderBy && options.orderBy.length >= 1) {
      const sortOptions: {[key: string]: SortDirection} = {};
      for (const ordering of options.orderBy) {
        sortOptions[ordering.sort] = ordering.direction || SortDirection.asc;
      }
      stmt = stmt.sort(sortOptions);
    }
    if (options.first != null) {
      stmt = stmt.limit(options.first);
    }
    return (await stmt) || [];
  }
/*%>*/
/*<%_ _%>
  async findOne(id: ObjectId | string): Promise<<%- serviceNode.model.name %> | null> {
    if (id == null) {
      throw new Error('id is required');
    }
    return await this.<%- serviceNode.identifier %>Model.findOne({_id: id});
  }

  async findAll(options: FindAllOptions = {}): Promise<<%- serviceNode.model.name %>[]> {
    let stmt = this.<%- serviceNode.identifier %>Model.find();
    if (options.orderBy && options.orderBy.length >= 1) {
      const sortOptions: {[key: string]: SortDirection} = {};
      for (const ordering of options.orderBy) {
        sortOptions[ordering.sort] = ordering.direction || SortDirection.asc;
      }
      stmt = stmt.sort(sortOptions);
    }
    if (options.first != null) {
      stmt = stmt.limit(options.first);
    }
    return (await stmt) || [];
  }
<%_ _%>*/

}
