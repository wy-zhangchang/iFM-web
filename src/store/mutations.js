
import { RECEIVE_ORGANIZATION } from './mutation-types'

export default {
  [RECEIVE_ORGANIZATION](state, {data}){
    state.dataList = data
  }
}
