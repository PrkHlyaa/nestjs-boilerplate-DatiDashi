import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderToOrganizationMembers1731179000000
  implements MigrationInterface
{
  name = 'AddOrderToOrganizationMembers1731179000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization_members" ADD "order" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization_members" DROP COLUMN "order"`,
    );
  }
}
