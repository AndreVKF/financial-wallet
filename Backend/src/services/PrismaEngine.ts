import { PrismaClient } from "@prisma/client"

export class PrismaEngine {
  private static instance: PrismaClient

  private constructor() {
    PrismaEngine.instance = new PrismaClient()
  }

  public static getInstance(): PrismaClient {
    if (!PrismaEngine.instance) {
      PrismaEngine.instance = new PrismaClient()
    }

    return PrismaEngine.instance
  }
}
