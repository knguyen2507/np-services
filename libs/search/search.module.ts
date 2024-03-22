import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { environment } from 'src/environment';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: async () => ({
        node: environment.ELASTICSEARCH_NODE,
        auth: {
          username: environment.ELASTICSEARCH_USERNAME,
          password: environment.ELASTICSEARCH_PASSWORD,
        },
      }),
    }),
  ],
  exports: [ElasticsearchModule],
})
export class SearchModule {}
