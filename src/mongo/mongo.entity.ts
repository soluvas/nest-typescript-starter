import { ObjectType, ID, Field, Float, Int,} from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { modelOptions, prop } from '@typegoose/typegoose';
import { IsString } from 'class-validator';
import { Node } from '../nestjs-graphql-relay';
import { GeoPoint } from '../geopoint';

/**
 * <%# Projects. %><%- entityNode.model.description %>
 */
/*<%#*/
@modelOptions({schemaOptions: {collection: 'projects'}})
@ObjectType({implements: Node,
  description: "Project."
})
export class Project extends Node {
/*_%>*/
/*<%_ _%>
@modelOptions({schemaOptions: {collection: '<%- entityNode.collectionName %>'}})
@ObjectType({implements: Node,
  description: <%- entityNode.model.description ? JSON.stringify(entityNode.model.description) : 'undefined' %>
})
export class <%- entityNode.model.name -%> extends Node {  
<%_ _%>*/
  @prop({alias: 'id'})
  _id?: ObjectId;

  @Field(() => ID, {nullable: false})
  id?: string;

/*<%#*/
  @IsString()
  @prop()
  @Field()
  name!: string;

  @IsString()
  @prop()
  @Field()
  slug!: string;
/*_%>*/

/*<% properties.forEach(prop => { %>
  /**
   * <%- prop.title %>.
   * 
   * <%- prop.description %>
  <%-'*'+'/'%> 
  @prop()
  @Field(() => <%- prop.graphqlType %>, {nullable: <%- prop.required ? 'false' : 'true' %>,
    description: <%- prop.description ? JSON.stringify(prop.description) : 'undefined' %>})
  <%- prop.name + (prop.required ? '!' : '?') %>: <%- prop.esTypeName %>;
<% }) %>*/

}
