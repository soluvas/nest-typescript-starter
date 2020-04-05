import { Field, ObjectType, Int, ID, InterfaceType } from '@nestjs/graphql';
import * as Relay from 'graphql-relay';

@InterfaceType()
export abstract class Node {
  @Field(() => ID, {nullable: false})
  id?: string;
}

@ObjectType({ isAbstract: true })
export abstract class Aggregate {
  @Field(() => Int)
  readonly count: number;
}

@ObjectType()
export class PageInfo implements Relay.PageInfo {
  @Field(() => Boolean, { nullable: true })
  hasNextPage?: boolean;
  @Field(() => Boolean, { nullable: true })
  hasPreviousPage?: boolean;
  @Field(() => String, { nullable: true })
  startCursor?: Relay.ConnectionCursor;
  @Field(() => String, { nullable: true })
  endCursor?: Relay.ConnectionCursor;
}
