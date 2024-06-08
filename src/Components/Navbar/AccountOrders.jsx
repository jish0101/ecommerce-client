import { HoverCard, Avatar, Text, Group, Anchor, Stack } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../Store/reducers/Auth/authSelector';
import { Check, ChevronDown, XCircle } from 'lucide-react';
import { BASE_URL } from '../../Lib/GlobalExports';
import { Link } from 'react-router-dom';
import { logout } from '../../Store/reducers/Auth/authSlice';
import { API_KEYS, API_URL, api } from '../../Api/api';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { startLoading, endLoading } from '../../Store/reducers/globalLoader/loaderSlice';
import { useMutation } from '@tanstack/react-query';

const AccountOrders = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const { mutateAsync: logoutApi, isPending: isLoadingLogout } = useMutation({
    mutationFn: async () => {
      const response = await api.post(API_URL.logout);
      return response;
    },
    mutationKey: API_KEYS.logout,
  });

  const getName = () => {
    try {
      const name = user?.name;

      if (name) {
        return name.split(' ')[0];
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logoutApi({});
      const { status, message } = res.data;

      if (status) {
        notifications.show({
          id: 'logout',
          withCloseButton: true,
          autoClose: 2000,
          title: <h4 className="font-bold text-lg">Bye!</h4>,
          message: <p className="text-base">{message}</p>,
          color: 'yellow',
          withBorder: true,
          radius: 'lg',
          icon: <Check size={40} className="p-1" key={'login'} />,
          loading: false,
        });
        dispatch(logout());
      }
    } catch (err) {
      const error = err?.response?.data;
      console.log(err);
      notifications.show({
        id: 'logout',
        withCloseButton: true,
        autoClose: 2000,
        title: <h4 className="font-bold text-lg">Oops!</h4>,
        message: <p className="text-base">{error?.message}</p>,
        color: 'red',
        icon: <XCircle size={50} key={'login'} />,
        loading: false,
      });
    }
  };

  useEffect(() => {
    try {
      if (isLoadingLogout) {
        dispatch(startLoading());
      } else {
        dispatch(endLoading());
      }
    } catch (error) {
      console.log(error);
    }
  }, [isLoadingLogout]);

  return (
    <Group justify="center">
      <HoverCard width={320} shadow="md" withArrow openDelay={200} closeDelay={400}>
        <HoverCard.Target>
          {/* <Avatar src={user?.profile} radius="xl" /> */}
          <div className="flex flex-col rounded-sm hover:outline hover:outline-1 p-1">
            <span className="text-sm text-lightText">Hello, {getName() || ''}</span>
            <span className="flex items-center gap-1 font-semibold">
              Account & Lists <ChevronDown size={15} />
            </span>
          </div>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <div className="flex items-center bg-blue-100 p-4 gap-3 rounded-md">
            <Avatar className="outline outline-1" src={`${BASE_URL}${user?.profile}`} radius="xl" />
            <div className="flex flex-col">
              <Text size="sm" fw={700} style={{ lineHeight: 1 }}>
                {user?.name}
              </Text>
              <Text size="sm" className="text-slate-800" style={{ lineHeight: 1 }}>
                Account holder
              </Text>
            </div>
            <Text
              size="sm"
              className="text-blue-500 hover:text-orange-400 hover:underline"
              component={Link}
              to={'/user-profile'}
            >
              Manage Profile {'>'}
            </Text>
          </div>

          <div className="p-2">
            <ul>
              <li className="font-bold text-base">Your Account</li>
              <li>
                <Link
                  className="hover:text-orange-400 hover:underline text-slate-700 text-sm"
                  to={'/user-account'}
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-orange-400 hover:underline text-slate-700 text-sm"
                  to={'/user-account/orders'}
                >
                  Orders
                </Link>
              </li>
              <li>
                <button
                  className="hover:text-orange-400 hover:underline text-slate-700 text-sm disabled:cursor-not-allowed disabled:opacity-70"
                  onClick={handleLogout}
                  disabled={isLoadingLogout}
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
};

export default AccountOrders;
