import { isAuthorized } from "../../middlewares/authorization";
import { AgentDoc } from "../../models/Agent";
import { Context } from "../resolvers";

export const LeadQueries = {
  //     async fetchLeads(prt:any,args:{offset:number,limit:number},{req,Lead}:Context){
  //         const agent:AgentDoc= isAuthorized(req,"agent")
  // Lead.findOne({property:agent._id})
  //     }
};
