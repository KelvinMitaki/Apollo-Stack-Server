import mongoose from "mongoose";
import { isAuthorized } from "../../middlewares/authorization";
import { AgentDoc } from "../../models/Agent";
import { Context } from "../resolvers";

const daysInMonth = (month: number) => {
  const d = new Date();
  d.setMonth(d.getMonth() - month);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
};
// console.log(daysInMonth(0));
export const LeadQueries = {
  async fetchLeads(
    prt: any,
    args: { offset: number; limit: number },
    { req, Lead }: Context
  ) {
    const agent: AgentDoc = await isAuthorized(req, "agent");
    return Lead.find({ agent: agent._id }, null, {
      skip: args.offset,
      limit: args.limit
    }).populate("property", "_id streetAddress");
  },
  async fetchLeadsCount(prt: any, args: any, { req, Lead }: Context) {
    const agent: AgentDoc = await isAuthorized(req, "agent");
    return {
      count: Lead.countDocuments({ agent: agent._id })
    };
  },
  async countViewsAndLeadsCount(
    prt: any,
    args: any,
    { Visitor, Lead, req }: Context
  ) {
    const agent = await isAuthorized(req, "agent");
    const views = await Visitor.aggregate([
      {
        $match: {
          createdAt: {
            $gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30.4167 * 6),
            agent: agent._id
          }
        }
      },
      {
        $group: {
          _id: {
            month: "$month"
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: { month: "$_id.month", count: 1, _id: 0 }
      }
    ]);
    const leads = await Lead.aggregate([
      {
        $match: {
          createdAt: {
            $gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30.4167 * 6),
            agent: agent._id
          }
        }
      },
      {
        $group: {
          _id: {
            month: "$month"
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: { month: "$_id.month", count: 1, _id: 0 }
      }
    ]);
    return { views, leads };
  }
};
