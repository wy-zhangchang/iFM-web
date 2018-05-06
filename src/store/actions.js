
import { reqOrganization } from '../api'
import { RECEIVE_ORGANIZATION } from './mutation-types'

export default {
  async getOrganization({commit}){
    const result = await reqOrganization()
    commit(RECEIVE_ORGANIZATION, {data:result.data})
  }
}
