import type { FC } from "react"
import { Typography } from "@mui/material"



type AttributeProps = {
    label: string,
    value: string | number
}
  const Attribute: FC<AttributeProps> = ({ label, value }) => {
    return (
      <>
        <Typography variant="h2">{label}</Typography>
        <Typography variant="h3">{value}</Typography>
      </>
    )
    }
    export default Attribute