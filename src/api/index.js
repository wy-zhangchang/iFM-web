
import ajax from './ajax'

// 获取数据
export const reqOrganization = ()=> ajax('/organization')

export const reqMaterialtype = ()=> ajax('/api/materialtype')
export const reqMaterialtype_add = ({id, name})=> ajax('/api/materialtype_add', {id, name})
export const reqMaterialtype_update = ({id, name})=> ajax('/api/materialtype_update', {id, name})

export const reqMateriallist = ({id})=> ajax('/api/materiallist', {id})
export const reqMateriallist_add = ({id, name, brand, unit})=> ajax('/api/materiallist_add', {id, name, brand, unit})
export const reqMateriallist_del = ({pId, cId})=> ajax('/api/materiallist_del', {pId, cId})
