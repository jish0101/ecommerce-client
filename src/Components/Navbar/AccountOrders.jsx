import { HoverCard, Avatar, Text, Group, Anchor, Stack } from '@mantine/core';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Store/reducers/Auth/authSelector';
import { ChevronDown } from 'lucide-react';
import { BASE_URL } from '../../Lib/GlobalExports';
import { Link } from 'react-router-dom';

const AccountOrders = () => {
  const user = useSelector(selectUser);

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

  const handleLogout = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Group justify="center">
      <HoverCard width={320} shadow="md" withArrow openDelay={200} closeDelay={400}>
        <HoverCard.Target>
          {/* <Avatar src={user?.profile} radius="xl" /> */}
          <div className="flex flex-col h-full rounded-sm hover:outline hover:outline-1 p-1">
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
                  to={'/orders'}
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-orange-400 hover:underline text-slate-700 text-sm"
                  onClick={handleLogout}
                >
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
};

export default AccountOrders;
