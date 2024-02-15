import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@mantine/core';

const Searchbar = () => {
  return (
    <div className="flex items-center h-full flex-1">
      <Input
        size="md"
        variant="unstyled"
        placeholder="Search Amazon"
        className="px-3 bg-white overflow-hidden w-full rounded-md focus-within:outline focus-within:outline-orange_100"
        rightSection={
          <div className="bg-orange_100 text-darkblue-1000 h-[105%] p-2 border border-orange_100">
            <Search />
          </div>
        }
      />
    </div>
  );
};

export default Searchbar;
