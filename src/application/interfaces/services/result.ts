export default interface Result<T = undefined> {
  success: boolean
  data?: T
  code: 400 | 500
}

