import { Card, Text } from '@mantine/core';
import { NotebookTabs, Truck } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Account = () => {
  const cards = [
    {
      title: 'Your order',
      subTitle: 'Track, return, cancel an order, download invoice or buy again',
      link: '/user-account/orders',
      icon: <Truck size={48} />,
    },
    {
      title: 'Your addresses',
      subTitle: 'Edit, remove or set default address',
      link: '/user-account/addresses',
      icon: <NotebookTabs size={48} />,
    },
  ];
  return (
    <section>
      <div className="md:w-[1001px] mx-auto p-2">
        <h2 className="text-3xl">Your Account</h2>

        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-3 my-4">
          {cards.map((card) => (
            <>
              <Card radius={'md'} className="border" component={Link} to={card.link}>
                <Card.Section display={'flex'} className="gap-3 p-4">
                  <div>{card.icon}</div>
                  <div>
                    <Text className="font-medium" size="xl">
                      {card.title}
                    </Text>
                    <span className="text-amazon_lighter text-sm">{card.subTitle}</span>
                  </div>
                </Card.Section>
              </Card>
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Account;
