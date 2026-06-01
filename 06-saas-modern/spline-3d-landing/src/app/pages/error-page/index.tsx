import React from "react";
import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";
import Spline from "@splinetool/react-spline";
import { useNavigate } from "react-router";

const useStyles = createStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  root11: {
    width: "90vw",
    height: "100vh",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  root2: {
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  control: {
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },

  image: {
    width: "100%",
    height: "100%",
    flex: 1,
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  mobileImage: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  desktopImage: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export function ErrorPage() {
  const { classes } = useStyles();

  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <Container fluid className={classes.root11}>
        <SimpleGrid cols={2} className={classes.root2}>
          <div>
            <Title className={classes.title}>Something is not right...</Title>
            <Text color="dimmed" size="lg">
              Page you are trying to open does not exist. You may have mistyped
              the address, or the page has been moved to another URL.
            </Text>
            <Button
              variant="outline"
              color={"red"}
              size="md"
              mt="xl"
              className={classes.control}
              onClick={() => navigate("/")}
            >
              Get back to home page
            </Button>
          </div>
          <Spline
            className={classes.image}
            scene="https://prod.spline.design/l1PheWQu5u6fYNm1/scene.splinecode"
          />
        </SimpleGrid>
      </Container>
    </div>
  );
}
