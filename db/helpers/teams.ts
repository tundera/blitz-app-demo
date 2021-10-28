import db from "db"

import teams from "db/backups/documents/teams.json"
import players from "db/backups/documents/players.json"
import coaches from "db/backups/documents/coaches.json"
import colorSchemes from "db/helpers/team-colors.json"

export const seedTeamData = async () => {
  for (const team of teams) {
    const playerIds = players
      .filter((player) => player.teamId === team.handle)
      .map((player) => ({ handle: player.id }))

    const coachIds = coaches
      .filter((coach) => coach.teamId === team.handle)
      .map((coach) => ({ handle: coach.id }))

    const colors = colorSchemes.find((scheme) => scheme.handle === team.handle)
    const colorScheme = await db.colorScheme.findUnique({
      where: {
        ColorScheme_primary_secondary_key: {
          primary: colors?.primary as string,
          secondary: colors?.secondary as string,
        },
      },
    })

    await db.team.create({
      data: {
        handle: team.handle,
        name: team.name,
        slug: team.slug,
        city: team.city,
        established: team.established,
        abbreviation: team.abbreviation,
        wins: team.wins,
        losses: team.losses,
        winPercentage: team.winPercentage,
        conference: team.conference,
        division: team.division,
        players: {
          connect: playerIds,
        },
        coaches: {
          connect: coachIds,
        },
        colorScheme: {
          connect: { id: colorScheme?.id },
        },
      },
    })
  }
}
