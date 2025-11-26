export default interface Result<T = undefined> {
  success: boolean
  data?: T
}

