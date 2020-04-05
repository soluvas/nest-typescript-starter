import { ObjectType, Field } from "@nestjs/graphql";
import { prop } from "@typegoose/typegoose";

/**
 * Geographical point.
 */
@ObjectType({description: 'Geographical point.'})
export class GeoPoint {
  @prop()
  @Field({nullable: true, description: 'Always `Point`.'})
  type?: string;

  @prop()
  @Field(() => [Number], {nullable: true,
    description: 'Geographical coordinates as [longitude, latitude].'})
  coordinates?: number[];
}
