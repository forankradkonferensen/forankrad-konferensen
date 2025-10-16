export class Guid {
  static newGuid() {
    const guid = crypto.randomUUID();
    return guid;
  }
}