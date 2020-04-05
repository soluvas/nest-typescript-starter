import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypegooseModule } from "nestjs-typegoose";
/*<%#*/
import { HelloResolver } from './hello/hello.resolver';
import { MongoService } from './mongo/mongo.service';
import { MongoResolver } from './mongo.resolver';
import { Project } from './mongo/mongo.entity';
/*%>*/
/*<% models.forEach(it => { -%>
import { <%- it.name %> } from '<%- it.path %>';
<% }) -%>*/
/*<% services.forEach(it => { -%>
import { <%- it.name %> } from '<%- it.path %>';
<% }) -%>*/
/*<% resolvers.forEach(it => { -%>
import { <%- it.name %> } from '<%- it.path %>';
<% }) -%>*/

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async (configService: ConfigService) => {
        if (!configService.get('MONGODB_URI')) {
          throw new Error('MONGODB_URI environment configuration is required');
        }
        if (!configService.get('MONGODB_DATABASE')) {
          throw new Error('MONGODB_DATABASE environment configuration is required');
        }
        return {
          uri: configService.get('MONGODB_URI'),
          dbName: configService.get('MONGODB_DATABASE'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: true,
          useCreateIndex: true,
        };
      },
      inject: [ConfigService],
    }),
    TypegooseModule.forFeature([
      /*<%# */ Project /* _%>*/
      /*<%- models.map(it => it.name).join(', ') %>*/
    ]),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    })
  ],
  controllers: [AppController],
  providers: [AppService,
    /*<%# */ HelloResolver, MongoResolver, MongoService /* _%>*/
    /*<%- services.map(_ => `${_.name}, `).join('') %>*/
    /*<%- resolvers.map(_ => `${_.name}, `).join('') %>*/
  ],
  exports: [
    /*<%- services.map(_ => `${_.name}, `).join('') %>*/
  ]
})
export class AppModule {}
