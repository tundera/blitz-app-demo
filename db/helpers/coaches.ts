import db from "db"

import coaches from "db/backups/documents/coaches.json"
import images from "db/backups/documents/images.json"

export const seedCoachData = async () => {
  for (const coach of coaches) {
    // Create coach in database
    await db.coach.create({
      data: {
        handle: coach.handle,
        name: coach.name,
        type: coach.type,
        isAssistant: coach.isAssistant,
      },
    })
  }
}
