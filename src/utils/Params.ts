import ParseError from '../errors/ParseError'
import { AllParamTypes } from '../interface/Params'
import { ParamsParser } from '../ParamsParser'

export function paramParser (start : number, end : number, params? : string) : AllParamTypes | undefined {
  if (params) {
    const parser = new ParamsParser(params)
    try {
      return parser.parseExpressions()
    } catch (e) {
      throw new ParseError(e.message, { start: start + e.start, end })
    }
  } else {
    return undefined
  }
}
