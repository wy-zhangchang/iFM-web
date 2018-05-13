
import {
  RECEIVE_ORGANIZATION,
  RECEIVE_MATERIALTYPE,
  RECEIVE_MATERIALTYPE_ADD,
  RECEIVE_MATERIALTYPE_UPDATE,
  RECEIVE_MATERIALLIST,
  RECEIVE_MATERIALLIST_ADD
} from './mutation-types'

export default {
  [RECEIVE_ORGANIZATION](state, {data}){
    state.dataList = data
  },

  [RECEIVE_MATERIALTYPE](state, {data}){
    state.materialtypes = data
  },

  [RECEIVE_MATERIALTYPE_ADD](state, {data}){
    state.materialtypes_add = data
  },

  [RECEIVE_MATERIALTYPE_UPDATE](state, {data}){
    state.materialtypes_update = data
  },

  [RECEIVE_MATERIALLIST](state, {data}){
    state.materiallists = data
  },

  [RECEIVE_MATERIALLIST_ADD](state, {data}){
    state.materiallists_add = data
  }
}
