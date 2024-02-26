import { AppShell, Avatar, Box, Burger, Group, ScrollArea } from '@mantine/core';
import Navbar from '../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../Store/reducers/Auth/authSelector';
import { BASE_URL } from '../../Lib/GlobalExports';
import { Link } from 'react-router-dom';
import useProductCategories from '../../Hooks/useProductCategories';
import { selectSidebar } from '../../Store/reducers/sidebar/sidebar.selector';
import { toggleSidebar } from '../../Store/reducers/sidebar/sidebar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { API_KEYS, API_URL } from '../../Api/api';
import { logout } from '../../Store/reducers/Auth/authSlice';
import { setSelectedCategory } from '../../Store/reducers/SelectedCategory/selectedCategorySlice';

const AppLayout = ({ children }) => {
  const user = useSelector(selectUser);
  const isSidebarOpen = useSelector(selectSidebar);
  const dispatch = useDispatch();
  const api = useAxiosPrivate();

  const logoutFunc = async () => {
    const response = await api.post(API_URL.logout);
    return response;
  };

  const { mutateAsync: logoutApi, isPending: isLoadingLogout } = useMutation({
    mutationFn: logoutFunc,
  });

  const { data: categoryData } = useProductCategories({
    isPage: 1,
    filters: {
      rowCount: 100,
    },
  });

  const handleSignOut = async () => {
    try {
      await logoutApi();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  const categoryDataLinks = categoryData.map((data, i) => {
    try {
      return {
        id: i,
        label: data?.label,
        value: data?.value,
        link: `/search-page/${data?.value}`,
      };
    } catch (error) {
      console.log(error);
      return [];
    }
  });

  const getSelectedCategory = (category) => {
    try {
      return categoryData.find((data) => data.value === category.value);
    } catch (error) {
      console.log(error);
    }
  };

  const cols = [
    {
      cateogryName: 'Shop by Department',
      cateogryLinks: categoryDataLinks,
    },
    {
      cateogryName: 'Settings',
      cateogryLinks: [
        {
          label: 'Your Account',
          link: '/user-account',
        },
        {
          label: 'Sign out',
          onClick: handleSignOut,
        },
      ],
    },
  ];

  return (
    <AppShell
      header={{ height: 100 }}
      navbar={{
        width: 350,
        breakpoint: 'sm',
        collapsed: { mobile: !isSidebarOpen, desktop: !isSidebarOpen },
      }}
      h={'100%'}
    >
      <AppShell.Header>
        <Group h={'100%'} w={'100%'}>
          <Box className="w-full h-full bg-amazon_light p-0 text-white">
            <Navbar />
            <div className="flex justify-start px-1">
              <span
                onClick={() => dispatch(toggleSidebar())}
                className="flex items-center cursor-pointer p-1 hover:outline hover:outline-1"
              >
                <Burger color="#ffffff" opened={isSidebarOpen} size="sm" /> {/* hiddenFrom="md" */}
                All
              </span>
            </div>
          </Box>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShell.Section>
          <Link
            to={'/user-account'}
            className="flex items-center gap-3 bg-amazon_light text-white p-2 pl-8"
          >
            <Avatar className="outline outline-1" src={`${BASE_URL}${user?.profile}`} radius="xl" />
            <h3 className="font-semibold text-lg">Hello, {user?.name}</h3>
          </Link>
        </AppShell.Section>
        <AppShell.Section grow={false} component={ScrollArea}>
          <div>
            <ul>
              {cols.map((col) => {
                return (
                  <div key={col.cateogryName} className="border-b py-2">
                    <h2 className="font-semibold text-xl p-2 pl-8">{col.cateogryName}</h2>
                    {col.cateogryLinks.map((linkDetails) => {
                      return (
                        <li
                          onClick={() => {
                            if (linkDetails.onClick) {
                              return linkDetails.onClick();
                            } else {
                              dispatch(setSelectedCategory(getSelectedCategory(linkDetails)));
                              dispatch(toggleSidebar());
                            }
                          }}
                          className="flex"
                          key={linkDetails.id}
                        >
                          <Link
                            className="hover:bg-amazon_gray p-2 pl-8 flex-1"
                            to={linkDetails?.link}
                          >
                            {linkDetails.label}
                          </Link>
                        </li>
                      );
                    })}
                  </div>
                );
              })}
            </ul>
          </div>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
