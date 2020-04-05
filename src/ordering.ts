import { registerEnumType, Field, InputType } from "@nestjs/graphql";

export enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}
registerEnumType(SortDirection, {name: 'SortDirection'});

@InputType()
export class Ordering {
  @Field()
  sort!: string;

  @Field(() => SortDirection, {nullable: true})
  direction?: SortDirection;
}
