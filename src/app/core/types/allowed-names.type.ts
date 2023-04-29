export type AllowedNames<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never
}[keyof Base];