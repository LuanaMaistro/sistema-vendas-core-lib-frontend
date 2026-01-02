export default class Name {
  private _value: string

  private constructor(aName: string) {
    const cleanedName = this.cleanName(aName)
    if(this.isValidName(cleanedName))
      throw new Error("Nome invalido")
    this._value = cleanedName;
  }

  get Value() {
    return this._value
  }

  private isValidName(aName: string): boolean {
    if(aName.length < 3) return false
    if(/\d/.test(aName)) return false
    return true
  }
  private cleanName(aName: string) {
    return aName.trim()
  }

  static create(aName: string): Name {
    return new Name(aName)
  }
}
