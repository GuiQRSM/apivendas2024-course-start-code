import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Creat1744632942036 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          /*INFORMACOES REFERENTES AO CAMPO ID*/
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          /*INFORMACOES REFERENTE AO CAMPO NAME*/
          {
            name: 'name',
            type: 'varchar',
          },
          /*INFRMACOES REFERENTE AO CAMPO PREÇO*/
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          /*INFRMACOES REFERENTE AO CAMPO QUANTIDADE*/
          {
            name: 'quantity',
            type: 'int',
          },
          /*INFRMACOES REFERENTE AO CAMPO DATA DE CRIACAO*/
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          /*INFRMACOES REFERENTE AO CAMPO DATA DE ATUALIZACAO */
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products')
  }
}
