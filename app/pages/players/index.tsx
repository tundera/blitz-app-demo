import { Suspense, SuspenseList } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import { List, ListItem, Flex, Button, ButtonGroup } from "@chakra-ui/react"

import Layout from "app/core/layouts/Layout"
import getPlayers from "app/players/queries/getPlayers"

const ITEMS_PER_PAGE = 100

export const PlayersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ players, hasMore }] = usePaginatedQuery(getPlayers, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <Flex direction="column" align="center" justify="center">
      <List textAlign="center">
        {players.map((player) => (
          <ListItem key={player.id}>
            <Link href={Routes.ShowPlayerPage({ playerId: player.id })}>
              <a>{player.name}</a>
            </Link>
          </ListItem>
        ))}
      </List>

      <ButtonGroup mt={4}>
        <Button disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </Button>
        <Button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </Button>
      </ButtonGroup>
    </Flex>
  )
}

const PlayersPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Players</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.Home()}>
            <a>Home</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PlayersList />
        </Suspense>
      </div>
    </>
  )
}

PlayersPage.authenticate = true
PlayersPage.getLayout = (page) => <Layout>{page}</Layout>

export default PlayersPage
