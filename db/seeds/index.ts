import task from "tasuku"

import { seedCoachData } from "db/helpers/coaches"
import { seedPlayerData } from "db/helpers/players"
import { seedTeamData } from "db/helpers/teams"
import { seedColorSchemesData } from "db/helpers/colorSchemes"

const seed = async () => {
  const runSeedTasks = async () => {
    await task("Seed tasks", async ({ task }) => {
      const tasks = await task.group((task) => [
        task("Seeding players", async () => await seedPlayerData()),
        task("Seeding coaches", async () => await seedCoachData()),
        task("Seeding color schemes", async () => await seedColorSchemesData()),
        task("Seeding teams", async () => await seedTeamData()),
      ])

      tasks.clear()
    })
  }

  await runSeedTasks()
}

export default seed
