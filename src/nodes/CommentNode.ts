import NodeNames from '../enum/NodeNames'
import { IToken } from '../interface/Tokens'
import AbstractNode from './abstract/AbstractNode'

export default class CommentNode extends AbstractNode {
  public text : string

  constructor (token : IToken) {
    super(NodeNames.Comment, token)
    this.text = token.text
  }
}