import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetCoach = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetCoach), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const coach = await db.coach.findFirst({ where: { id } })

  if (!coach) throw new NotFoundError()

  return coach
})
