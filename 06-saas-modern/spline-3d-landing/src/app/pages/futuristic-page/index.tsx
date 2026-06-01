import React from "react";
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  useMantineTheme,
  SimpleGrid,
  Grid,
  Overlay,
  ActionIcon,
  Col,
  Card,
  Avatar,
} from "@mantine/core";
import { Check } from "tabler-icons-react";
import Spline from "@splinetool/react-spline";
import HeaderMenu from "../../shared/components/header";
import {
  ReactJs,
  Typescript,
  Visualstudiocode,
} from "@icons-pack/react-simple-icons";
import {
  Icon3dCubeSphere,
  IconBrandInstagram,
  IconBrandReactNative,
  IconBrandTwitter,
  IconBrandYoutube,
  IconCircleDotted,
  IconFileCode,
  IconFlame,
  IconReceiptOff,
} from "@tabler/icons";

const features = [
  {
    icon: Typescript,
    title: "TypeScript",
    description:
      "All packages are published under MIT license, you can use Mantine in any project",
  },
  {
    icon: ReactJs,
    title: "React JS",
    description:
      "Build type safe applications, all components and hooks export types",
  },
  {
    icon: Visualstudiocode,
    title: "Visual Studio Code",
    description:
      "With new :focus-visible selector focus ring will appear only when user navigates with keyboard",
  },
  {
    icon: Icon3dCubeSphere,
    title: "Spline 3D",
    description:
      "Customize colors, spacing, shadows, fonts and many other settings with global theme object",
  },
];

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
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

  highlight: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
      fontSize: theme.fontSizes.sm,
    },
  },

  wrapper: {
    padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl}px`,
  },

  titleBody: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 36,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  logo: {
    width: 50,
    height: 50,
    fill: "#61DAFB",
  },

  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  innerFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },

  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  titleCard: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },

  rootProjects: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  wrapperOther: {
    height: 500,
    width: "70vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.xl * 2,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "column-reverse",
      padding: theme.spacing.xl,
    },
  },

  imageOther: {
    width: 200,
    height: 200,
    maxWidth: "40%",

    flex: 1,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  titleOther: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },
}));

export default function FuturisticPage() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  function HeaderSection() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Container fluid>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                A <span className={classes.highlight}>modern</span> React <br />{" "}
                components library
              </Title>
              <Text color="dimmed" mt="md">
                Build fully functional accessible web applications faster than
                ever – Mantine includes more than 120 customizable components
                and hooks to cover you in any situation
              </Text>

              <List
                mt={30}
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <Check size={12} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>TypeScript based</b> – build type safe applications, all
                  components and hooks export types
                </List.Item>
                <List.Item>
                  <b>Free and open source</b> – all packages have MIT license,
                  you can use Mantine in any project
                </List.Item>
                <List.Item>
                  <b>No annoying focus ring</b> – focus ring will appear only
                  when user navigates with keyboard
                </List.Item>
              </List>

              <Group mt={30}>
                <Button radius="xl" size="md" className={classes.control}>
                  Get started
                </Button>
                <Button
                  variant="default"
                  radius="xl"
                  size="md"
                  className={classes.control}
                >
                  Source code
                </Button>
              </Group>
            </div>
            <Spline
              scene="https://prod.spline.design/byTsJI7PioSkQQIS/scene.splinecode"
              className={classes.image}
            />
          </div>
        </Container>
      </div>
    );
  }

  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: "blue", to: "cyan" }}
      >
        <feature.icon size={26} />
      </ThemeIcon>
      <Text size="lg" mt="sm" weight={500}>
        {feature.title}
      </Text>
      <Text color="dimmed" size="sm">
        {feature.description}
      </Text>
    </div>
  ));

  function BodySection() {
    return (
      <Container fluid>
        <div className={classes.wrapper}>
          <Grid gutter={80}>
            <Col span={12} md={5}>
              <Title className={classes.titleBody} order={2}>
                A fully featured React components library for your next project
              </Title>
              <Text color="dimmed">
                Build fully functional accessible web applications faster than
                ever – Mantine includes more than 120 customizable components
                and hooks to cover you in any situation
              </Text>

              <Button
                variant="gradient"
                gradient={{ deg: 133, from: "blue", to: "cyan" }}
                size="lg"
                radius="md"
                mt="xl"
              >
                Get started
              </Button>
            </Col>
            <Col span={12} md={7}>
              <SimpleGrid
                cols={2}
                spacing={30}
                breakpoints={[{ maxWidth: "md", cols: 1 }]}
              >
                {items}
              </SimpleGrid>
            </Col>
          </Grid>
        </div>
      </Container>
    );
  }

  function otherProjectsSection() {
    return (
      <Container fluid className={classes.rootProjects}>
        <div className={classes.wrapperOther}>
          <div className={classes.body}>
            <Title className={classes.titleOther}>Wait a minute...</Title>
            <Text weight={500} size="lg" mb={5}>
              Subscribe to our newsletter!
            </Text>
            <Text size="sm" color="dimmed">
              You will never miss important product updates, latest news and
              community QA sessions. Our newsletter is once a week, every
              Sunday.
            </Text>
            <Card withBorder radius="md" p={0} className={classes.card}>
              <Group noWrap spacing={0}>
                <Image
                  src={"pokedex-website-example.jpg"}
                  height={140}
                  width={140}
                />
                <div className={classes.body}>
                  <Text
                    transform="uppercase"
                    color="dimmed"
                    weight={700}
                    size="xs"
                  >
                    Tech
                  </Text>
                  <Text className={classes.titleCard} mt="xs" mb="md">
                    Pokedex website
                  </Text>
                  <Group noWrap spacing="xs">
                    <Group spacing="xs" noWrap>
                      <Avatar size={20} />
                      <Text size="xs">Kayky Dias</Text>
                    </Group>
                    <Text size="xs" color="dimmed">
                      •
                    </Text>
                    <Text size="xs" color="dimmed">
                      13/05
                    </Text>
                  </Group>
                </div>
              </Group>
            </Card>
          </div>
          <div className={classes.imageOther}>
            <Spline scene="https://prod.spline.design/TMsHSGmH08dzoORC/scene.splinecode" />
          </div>
        </div>
      </Container>
    );
  }

  function footerSection() {
    return (
      <div className={classes.footer}>
        <Container className={classes.innerFooter}>
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={classes.logo}
          >
            <title>React</title>
            <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
          </svg>
          <Group spacing={0} className={classes.links} position="right" noWrap>
            <ActionIcon size="lg">
              <IconBrandTwitter size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg">
              <IconBrandYoutube size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg">
              <IconBrandInstagram size={18} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Container>
      </div>
    );
  }

  return (
    <>
      <HeaderMenu />
      {HeaderSection()}
      {BodySection()}
      {otherProjectsSection()}
      {footerSection()}
    </>
  );
}
