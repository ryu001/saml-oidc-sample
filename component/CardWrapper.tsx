'use client'
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material'
import React from "react";

interface CardWrapperProps {
  children: React.ReactNode,
  headerLabel: string
}
export const CardWrapper = ({
  children,
  headerLabel
}: CardWrapperProps) => {
  return(
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#f0f0f0"
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {headerLabel}
          </Typography>
          {children}
        </CardContent>
      </Card>
    </Box>
  )
}
