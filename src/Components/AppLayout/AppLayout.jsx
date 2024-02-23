import { AppShell, Box, Burger, Group, ScrollArea, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
import { selectProductCategories } from '../../Store/reducers/ProductCateogory/productCateogoriesSelector';

const AppLayout = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  const productCategories = useSelector(selectProductCategories);
  console.log('🚀 ~ AppLayout ~ productCategories:', productCategories);

  return (
    <AppShell
      header={{ height: 100 }}
      navbar={{ width: 350, breakpoint: 'sm', collapsed: { mobile: !opened, desktop: !opened } }}
      h={'100%'}
    >
      <AppShell.Header>
        <Group h={'100%'} w={'100%'}>
          <Box className="w-full h-full bg-amazon_light p-0 text-white">
            <Navbar />
            <div className="flex justify-start px-1">
              <span
                onClick={toggle}
                className="flex items-center cursor-pointer p-1 hover:outline hover:outline-1"
              >
                <Burger color="#ffffff" opened={opened} size="sm" /> {/* hiddenFrom="md" */}
                All
              </span>
            </div>
          </Box>
        </Group>
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
