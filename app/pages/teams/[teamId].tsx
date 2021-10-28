import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, Routes, Image } from "blitz"
import { Stack, Heading, Box, Text, Flex, List, ListItem } from "@chakra-ui/react"

import Layout from "app/core/layouts/Layout"
import getTeam from "app/teams/queries/getTeam"
import getPlayers from "app/players/queries/getPlayers"
import { FullPageSpinner } from "app/core/components/FullPageSpinner"

import { useCloudinaryImage } from "app/core/hooks/useCloudinaryImage"

export const Team = () => {
  const teamId = useParam("teamId", "string")
  const [team] = useQuery(getTeam, { id: teamId })
  const [{ players }] = useQuery(getPlayers, { where: { teamId: team.id } }, { enabled: !!team })

  const { imageURL, blurDataURL } = useCloudinaryImage(`nba/teams/${team.handle}`)

  return (
    <>
      <Head>
        <title>
          {team.city} {team.name}
        </title>
      </Head>

      <div>
        <Stack align="center">
          <Heading as="h1">
            {team.city} {team.name}
          </Heading>
          <Box
            w="xs"
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            textAlign="center"
            transition="ease-in-out"
            transitionDuration="250ms"
          >
            <Image
              src={imageURL}
              width={150}
              height={150}
              layout="responsive"
              objectFit="cover"
              alt={`${team.name} avatar`}
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </Box>
          <Text>
            {team.wins} - {team.losses}
          </Text>

          <Box textAlign="center">
            <Heading as="h2">Roster</Heading>
            <List>
              {players.map((player) => (
                <ListItem key={player.id}>
                  <Link href="/players/[playerId]" as={`/players/${player.id}`}>
                    <a>{player.name}</a>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </div>
    </>
  )
}
const ShowTeamPage: BlitzPage = () => {
  return (
    <Flex direction="column" align="center">
      <p>
        <Link href={Routes.TeamsPage()}>
          <a>Back</a>
        </Link>
      </p>

      <Suspense fallback={<FullPageSpinner />}>
        <Team />
      </Suspense>
    </Flex>
  )
}

ShowTeamPage.authenticate = true
ShowTeamPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTeamPage
