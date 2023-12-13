import { randomUUID } from "crypto";

export class User {
  public constructor(public readonly username: string, public readonly id: string = randomUUID()) {}
}
