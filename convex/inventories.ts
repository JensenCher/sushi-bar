import { ConvexError, v } from "convex/values";
import {
  MutationCtx,
  QueryCtx,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { Id } from "./_generated/dataModel";

export async function hasAccessToInventory(
  ctx: MutationCtx | QueryCtx,
  inventoryId: Id<"inventories">,
) {
  const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

  if (!userId) {
    return null;
  }

  const inventory = await ctx.db.get(inventoryId);

  if (!inventory) {
    return null;
  }

  // if (inventory.orgId) {
  //   const hasAccess = await hasOrgAccess(ctx, inventory.orgId);

  //   if (!hasAccess) {
  //     return null;
  //   }
  // } else {
  //   if (inventory.tokenIdentifier !== userId) {
  //     return null;
  //   }
  // }
  if (inventory.tokenIdentifier !== userId) {
    return null;
  }

  return { inventory, userId };
}

export const hasAccessToDocumentQuery = internalQuery({
  args: {
    inventoryId: v.id("inventories"),
  },
  async handler(ctx, args) {
    return await hasAccessToInventory(ctx, args.inventoryId);
  },
});

// export const hasOrgAccess = async (
//   ctx: MutationCtx | QueryCtx,
//   orgId: string
// ) => {
//   const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

//   if (!userId) {
//     return false;
//   }

//   const membership = await ctx.db
//     .query("memberships")
//     .withIndex("by_orgId_userId", (q) =>
//       q.eq("orgId", orgId).eq("userId", userId)
//     )
//     .first();

//   return !!membership;
// };

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getInventory = query({
  args: { inventoryId: v.id("inventories") },
  async handler(ctx, args) {
    // Check if user Authenticated
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return null;
    }

    const inventory = await ctx.db.get(args.inventoryId);

    if (!inventory) {
      return null;
    }

    if (inventory?.tokenIdentifier !== userId) {
      return null;
    }

    return {
      ...inventory,
      inventoryUrl: await ctx.storage.getUrl(inventory.fileId),
    };
  },
});
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
    fileId: v.id("_storage"),
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
      fileId: args.fileId,
    });
  },
});

export const deleteInventory = mutation({
  args: {
    inventoryId: v.id("inventories"),
  },
  async handler(ctx, args) {
    const accessObj = await hasAccessToInventory(ctx, args.inventoryId);

    if (!accessObj) {
      throw new ConvexError("You do not have access to this inventory.");
    }

    await ctx.storage.delete(accessObj.inventory.fileId);

    await ctx.db.delete(args.inventoryId);
  },
});
