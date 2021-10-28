import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import { Flex, List, ListItem, Button, ButtonGroup } from "@chakra-ui/react"

import Layout from "app/core/layouts/Layout"
import getTeams from "app/teams/queries/getTeams"

const ITEMS_PER_PAGE = 100

export const TeamsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ teams, hasMore }] = usePaginatedQuery(getTeams, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <Flex direction="column" align="center" justify="center">
      <List textAlign="center">
        {teams.map((team) => (
          <ListItem key={team.id}>
            <Link href={Routes.ShowTeamPage({ teamId: team.id })}>
              <a>{team.name}</a>
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

const TeamsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Teams</title>
      </Head>

      <Flex direction="column" align="center">
        <p>
          <Link href={Routes.Home()}>
            <a>Home</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TeamsList />
        </Suspense>
      </Flex>
    </>
  )
}

TeamsPage.authenticate = true
TeamsPage.getLayout = (page) => <Layout>{page}</Layout>

export default TeamsPage
