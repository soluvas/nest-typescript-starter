import { Resolver, Query } from '@nestjs/graphql';

@Resolver('Hello')
export class HelloResolver {
  @Query(returns => String)
  async hello() {
    return 'Hello, World!';
  }
}
