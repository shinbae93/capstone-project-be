import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1680592720827 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS "user" (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      username varchar NOT NULL,
      password varchar NOT NULL,
      fullname varchar NOT NULL,
      email varchar NOT NULL,
      "phoneNumber" varchar NOT NULL,
      role varchar NOT NULL,
      "createdAt" timestamp with time zone NOT NULL,
      "updatedAt" timestamp with time zone NULL
    );

    CREATE TABLE IF NOT EXISTS "customer" (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      fullname varchar NOT NULL,
      email varchar NOT NULL,
      "phoneNumber" varchar NOT NULL,
      "userId" uuid NOT NULL,
      "createdAt" timestamp with time zone NOT NULL,
      "updatedAt" timestamp with time zone NULL,
      CONSTRAINT "fk_customer_userId" FOREIGN KEY ("userId") REFERENCES "user" ("id")
    );


    CREATE TABLE IF NOT EXISTS "userAddress" (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      address varchar NOT NULL,
      "userId" uuid NOT NULL,
      "createdAt" timestamp with time zone NOT NULL,
      "updatedAt" timestamp with time zone NULL,
      CONSTRAINT "fk_userAddress_userId" FOREIGN KEY ("userId") REFERENCES "user" ("id")
    );

    CREATE TABLE IF NOT EXISTS "token" (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      "refreshToken" varchar NOT NULL,
      "userId" uuid NOT NULL,
      "createdAt" timestamp with time zone NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "brand" (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      name varchar NOT NULL,
      "createdAt" timestamp with time zone NOT NULL,
      "updatedAt" timestamp with time zone NULL
    );

    CREATE TABLE IF NOT EXISTS "category" (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      name varchar NOT NULL,
      "createdAt" timestamp with time zone NOT NULL,
      "updatedAt" timestamp with time zone NULL
    );

    CREATE TABLE IF NOT EXISTS "product" (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      name varchar NOT NULL,
      price integer NOT NULL,
      "brandId" uuid NOT NULL,
      "categoryId" uuid NOT NULL,
      "createdAt" timestamp with time zone NOT NULL,
      "updatedAt" timestamp with time zone NULL,
      CONSTRAINT "fk_product_brandId" FOREIGN KEY ("brandId") REFERENCES "brand" ("id"),
      CONSTRAINT "fk_product_categoryId" FOREIGN KEY ("categoryId") REFERENCES "category" ("id")
    );

    CREATE TABLE IF NOT EXISTS "order" (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      "totalPrice" integer NOT NULL,
      status varchar NOT NULL,
      "userId" uuid NOT NULL,
      "receiveAt" timestamp with time zone NULL,
      "createdAt" timestamp with time zone NOT NULL,
      "updatedAt" timestamp with time zone NULL,
      CONSTRAINT "fk_order_userId" FOREIGN KEY ("userId") REFERENCES "user" ("id")
    );

    CREATE TABLE IF NOT EXISTS "orderItem" (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      "orderId" uuid NOT NULL,
      "productId" uuid NOT NULL,
      quantity integer NOT NULL,
      "actualUnitPrice" integer NOT NULL,
      "originalUnitPrice" integer NOT NULL,
      CONSTRAINT "fk_orderItem_orderId" FOREIGN KEY ("orderId") REFERENCES "order" ("id"),
      CONSTRAINT "fk_orderItem_productId" FOREIGN KEY ("productId") REFERENCES "product" ("id")
    );

    CREATE TABLE IF NOT EXISTS "cartItem" (
      "userId" uuid NOT NULL,
      "productId" uuid NOT NULL,
      quantity integer NOT NULL,
      PRIMARY KEY("userId", "productId"),
      CONSTRAINT "fk_cartItem_userId" FOREIGN KEY ("userId") REFERENCES "user" ("id"),
      CONSTRAINT "fk_cartItem_productId" FOREIGN KEY ("productId") REFERENCES "product" ("id")
    );

    CREATE TABLE IF NOT EXISTS "review" (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      comment varchar NOT NULL,
      rate float NOT NULL,
      "orderId" uuid NOT NULL,
      "userId" uuid NOT NULL,
      "productId" uuid NOT NULL,
      "createdAt" timestamp with time zone NOT NULL,
      "updatedAt" timestamp with time zone NULL,
      CONSTRAINT "fk_review_orderId" FOREIGN KEY ("orderId") REFERENCES "order" ("id"),
      CONSTRAINT "fk_review_userId" FOREIGN KEY ("userId") REFERENCES "user" ("id"),
      CONSTRAINT "fk_review_productId" FOREIGN KEY ("productId") REFERENCES "product" ("id")
    );

    CREATE TABLE IF NOT EXISTS "review" (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      comment varchar NOT NULL,
      rate float NOT NULL,
      "orderId" uuid NOT NULL,
      "userId" uuid NOT NULL,
      "productId" uuid NOT NULL,
      "createdAt" timestamp with time zone NOT NULL,
      "updatedAt" timestamp with time zone NULL,
      CONSTRAINT "fk_review_orderId" FOREIGN KEY ("orderId") REFERENCES "order" ("id"),
      CONSTRAINT "fk_review_userId" FOREIGN KEY ("userId") REFERENCES "user" ("id"),
      CONSTRAINT "fk_review_productId" FOREIGN KEY ("productId") REFERENCES "product" ("id")
    );

    CREATE TABLE IF NOT EXISTS "discount" (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      name varchar NOT NULL,
      value float NOT NULL,
      unit varchar NOT NULL,
      "productId" uuid NOT NULL,
      "startTime" timestamp with time zone NOT NULL,
      "endTime" timestamp with time zone NOT NULL,
      "createdAt" timestamp with time zone NOT NULL,
      "updatedAt" timestamp with time zone NULL,
      CONSTRAINT "fk_discount_productId" FOREIGN KEY ("productId") REFERENCES "product" ("id")
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;

    GRANT ALL ON SCHEMA public TO postgres;
    GRANT ALL ON SCHEMA public TO public;`);
  }
}
