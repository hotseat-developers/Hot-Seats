import type { FC } from "react"
import { Typography } from "@mui/material"



type AttributeProps = {
    label: string,
    value: string | number
}
  const Attribute: FC<AttributeProps> = ({ label, value }) => {
    return (
      <>
        <Typography variant="h4">{label}</Typography>
        <Typography variant="h5">{value}</Typography>
      </>
    )
    }
    export default Attribute