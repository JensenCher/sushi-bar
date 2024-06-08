import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getInventories = query({
  async handler(ctx) {
    return await ctx.db.query("inventories").collect();
  },
});

export const createInventory = mutation({
  args: {
    title: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("inventories", {
      title: args.title,
    });
  },
});
