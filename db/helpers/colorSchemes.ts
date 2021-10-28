import db from "db"

import colorSchemes from "db/helpers/team-colors.json"

export const seedColorSchemesData = async () => {
  await db.colorScheme.createMany({
    data: colorSchemes.map((colorScheme) => ({
      primary: colorScheme.primary,
      secondary: colorScheme.secondary,
    })),
    skipDuplicates: true,
  })
}
