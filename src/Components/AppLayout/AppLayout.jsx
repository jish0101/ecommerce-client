import { AppShell, Burger, Flex, Group, ScrollArea, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Navbar from '../Navbar/Navbar';

const AppLayout = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{ width: 350, breakpoint: 'sm', collapsed: { mobile: !opened, desktop: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Navbar />
        <Flex justify={'flex-start'} align={'center'} h="100%" px="sm" onClick={toggle}>
          <Burger opened={opened} size="md" /> {/* hiddenFrom="md" */}
          All
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section>Navbar header</AppShell.Section>
        <AppShell.Section grow={false} my="md" component={ScrollArea}>
          60 links in a scrollable section
          {Array(60)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))}
        </AppShell.Section>
        <AppShell.Section>Navbar footer – always at the bottom</AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
