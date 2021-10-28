import type { FC } from "react"

import { Spinner, Center } from "@chakra-ui/react"

export const FullPageSpinner = () => {
  return (
    <Center height="100vh" width="100vw">
      <Spinner />
    </Center>
  )
}
