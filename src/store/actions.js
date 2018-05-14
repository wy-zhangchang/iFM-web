
import {
  reqOrganization,
  reqMaterialtype,
  reqMaterialtype_add,
  reqMaterialtype_update,
  reqMateriallist,
  reqMateriallist_add,
  reqMateriallist_del
} from '../api'

import {
  RECEIVE_ORGANIZATION,
  RECEIVE_MATERIALTYPE,
  RECEIVE_MATERIALTYPE_ADD,
  RECEIVE_MATERIALTYPE_UPDATE,
  RECEIVE_MATERIALLIST,
  RECEIVE_MATERIALLIST_ADD,
  RECEIVE_MATERIALLIST_DEL
} from './mutation-types'

export default {
  async getOrganization({commit}){
    const result = await reqOrganization()
    commit(RECEIVE_ORGANIZATION, {data:result.data})
  },

  async getMaterialtype({commit}){
    const result = await reqMaterialtype()
    commit(RECEIVE_MATERIALTYPE, {data:result.data})
  },

  async getMaterialtype_add({commit}, {id, name}){
    const result = await reqMaterialtype_add({id, name})
    commit(RECEIVE_MATERIALTYPE_ADD, {data:result.data})
  },

  async getMaterialtype_update({commit}, {id, name}){
    const result = await reqMaterialtype_update({id, name})
    commit(RECEIVE_MATERIALTYPE_UPDATE, {data:result.data})
  },

  async getMateriallist({commit}, {id}){
    const result = await reqMateriallist({id})
    commit(RECEIVE_MATERIALLIST, {data:result.data})
  },

  async getMateriallist_add({commit}, {id, name, brand, unit}){
    const result = await reqMateriallist_add({id, name, brand, unit})
    commit(RECEIVE_MATERIALLIST_ADD, {data:result.data})
  },

  async getMateriallist_del({commit}, {pId, cId}){
    const result = await reqMateriallist_del({pId, cId})
    commit(RECEIVE_MATERIALLIST_DEL, {data:result.data})
  }
}
