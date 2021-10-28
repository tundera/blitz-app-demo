import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetCoachesInput
  extends Pick<Prisma.CoachFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCoachesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: coaches,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.coach.count({ where }),
      query: (paginateArgs) => db.coach.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      coaches,
      nextPage,
      hasMore,
      count,
    }
  }
)
