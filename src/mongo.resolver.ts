import { Resolver, Query, Args, ID, ObjectType, Field } from '@nestjs/graphql';
import * as Relay from 'graphql-relay';
import { PageInfo, Aggregate } from './nestjs-graphql-relay';
import { Ordering } from './ordering';
/*<%#*/
import { Project } from './mongo/mongo.entity';
import { MongoService } from './mongo.service';
/*_%>*/

@ObjectType({isAbstract: true})
abstract class ProjectsEdge implements Relay.Edge<Project> {
  @Field(() => Project)
  readonly node!: Project;

  @Field()
  readonly cursor!: Relay.ConnectionCursor;
}

@ObjectType()
export class ProjectsConnection implements Relay.Connection<Project> {
  @Field()
  readonly pageInfo!: PageInfo;

  @Field(() => [ProjectsEdge])
  readonly edges!: Relay.Edge<Project>[];

  @Field(() => Aggregate, {nullable: true})
  readonly aggregate?: Aggregate;
}

@Resolver('Mongo')
export class MongoResolver {
  constructor(
    private readonly mongoService: MongoService
  ) {}

  @Query(() => Project, {nullable: true})
  async project(
    @Args('id', {type: () => ID, nullable: true}) id: string, 
    @Args('slug', {nullable: true}) slug: string): Promise<Project | null> {
    return await this.mongoService.findOneProject(id, slug);
  }

  @Query(() => ProjectsConnection)
  async projects(
    @Args('orderBy', {type: () => [Ordering], nullable: true}) orderBy: Ordering[] = [],
    @Args('first', {nullable: true}) first?: number,
    @Args('after', {nullable: true}) after?: string,
    @Args('last', {nullable: true}) last?: number,
    @Args('before', {nullable: true}) before?: string,
  ) {
    const edges = (await this.mongoService.findAllProjects({orderBy, first, after, last, before}))
      .map(_ => ({node: _, cursor: _.id} as ProjectsEdge));
    const startCursor = edges.length >= 1 ? edges[0].cursor : undefined;
    const endCursor = edges.length >= 1 ? edges[edges.length - 1].cursor : undefined;
    return {
      pageInfo: {hasPreviousPage: false, hasNextPage: false, startCursor, endCursor},
      edges};
  }

}
