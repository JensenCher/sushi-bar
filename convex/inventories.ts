import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getInventories = query({
  async handler(ctx) {
    // Check if user Authenticated
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return [];
    }
    return await ctx.db
      .query("inventories")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});

export const createInventory = mutation({
  args: {
    title: v.string(),
  },
  async handler(ctx, args) {
    // Check if user Authenticated
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("Not authenticated.");
    }

    await ctx.db.insert("inventories", {
      title: args.title,
      tokenIdentifier: userId,
    });
  },
});
