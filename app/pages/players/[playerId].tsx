import { Suspense } from "react"
import { Head, Link, useQuery, useParam, BlitzPage, Routes, Image } from "blitz"
import { Box, Stack, Heading, Text, Flex } from "@chakra-ui/react"

import Layout from "app/core/layouts/Layout"
import getPlayer from "app/players/queries/getPlayer"
import { useCloudinaryImage } from "app/core/hooks/useCloudinaryImage"
import { FullPageSpinner } from "app/core/components/FullPageSpinner"

export const Player = () => {
  const playerId = useParam("playerId", "string")
  const [player] = useQuery(getPlayer, { id: playerId })

  const { imageURL, blurDataURL } = useCloudinaryImage(`nba/players/${player.handle}`)

  return (
    <>
      <Head>
        <title>{player.name}</title>
      </Head>

      <Stack align="center">
        <Heading as="h1">{player.name}</Heading>
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
            alt={`${player.name} avatar`}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </Box>
        <Text>{player.position}</Text>
        <Text>
          {player.height} / {player.weight}
        </Text>
      </Stack>
    </>
  )
}

const ShowPlayerPage: BlitzPage = () => {
  return (
    <Flex direction="column" align="center">
      <Text>
        <Link href={Routes.PlayersPage()}>
          <a>Back</a>
        </Link>
      </Text>

      <Suspense fallback={<FullPageSpinner />}>
        <Player />
      </Suspense>
    </Flex>
  )
}

ShowPlayerPage.authenticate = true
ShowPlayerPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPlayerPage
