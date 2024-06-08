import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import LoaderComponent from '../../Components/Layout/Loader';
import { Breadcrumbs, Card, Modal, Button } from '@mantine/core';
import AddressForm from './AddressForm';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { notifications } from '@mantine/notifications';

const Addresses = () => {
  const api = useAxiosPrivate();
  const url = useLocation().pathname;
  const [modalData, setModalData] = useState({ status: false, data: null });

  const { mutateAsync: deleteAddress, isPending: isDeleting } = useMutation({
    mutationFn: async (id) => {
      try {
        const { status, message } = await api.delete(`/address/${id}`);
        console.log('🚀 ~ mutationFn: ~ status, message:', status, message);
      } catch (error) {
        return error;
      }
    },
  });

  const { data, isFetching, isLoading } = useQuery({
    queryKey: 'address',
    queryFn: async () => {
      const { data, status } = await api.get('/address');
      if (status === 200) {
        return data.data;
      }
      return null;
    },
  });

  const handleDelete = async (id) => {
    try {
      const res = await deleteAddress(id);
      console.log('🚀 ~ handleDelete ~ res:', res);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Server error',
      });
    }
  };

  if (isFetching || isLoading) {
    return (
      <div>
        <LoaderComponent />
      </div>
    );
  }

  const splitUrl = url.split('/').filter(Boolean);
  const generateUrl = (index) => {
    let url = '';
    for (let i = 0; i <= index; i++) {
      url = url.concat(splitUrl[i], '/');
    }
    return url;
  };

  const breadcrums = splitUrl.map((link, index) => (
    <Link className="capitalize text-blue-500" key={link} to={`/${generateUrl(index)}`}>
      {link}
    </Link>
  ));

  return (
    <section>
      <div className="md:w-[1001px] mx-auto p-4 grid gap-6">
        <div>
          <Breadcrumbs separator="/" separatorMargin="sm">
            {breadcrums}
          </Breadcrumbs>
        </div>
        <h3 className="text-3xl">Your Addresses</h3>
        <div className="grid md:grid-cols-3">
          <Card onClick={() => setModalData({ status: true })}>
            <div className="min-h-[250px] min-w-[100px] flex justify-center items-center cursor-pointer border-dashed border-gray-400 border-2 rounded-lg">
              <div className="flex flex-col items-center gap-2">
                <Plus size={50} color="gray" />
                <span className="text-2xl text-gray-500">Add Address</span>
              </div>
            </div>
          </Card>

          {Array.isArray(data) && data.length > 0
            ? data.map((add) => (
                <div>
                  <Card>
                    <div className="min-h-[250px] min-w-[100px] flex flex-col gap-2 border-dashed border-gray-400 border-2 rounded-lg p-3">
                      {add.isPrimary ? (
                        <div className="bg-green-400 w-fit p-2 rounded-md">
                          <span>Primary</span>
                        </div>
                      ) : null}
                      <div className="flex-1">
                        <div className={`flex flex-col ${!add.isPrimary ? 'mt-12' : ''}`}>
                          <span>Street: {add.street}</span>
                          <span>City: {add.city}</span>
                          <span>State: {add.state}</span>
                          <span>Country: {add.country}</span>
                          <span>Pin Code: {add.code}</span>
                        </div>
                      </div>
                      <Card.Section>
                        <div className="flex items-center gap-2 p-3">
                          <Button variant="transparent">Edit</Button>|
                          <Button onClick={() => handleDelete(add._id)} variant="transparent">
                            Remove
                          </Button>
                        </div>
                      </Card.Section>
                    </div>
                  </Card>
                </div>
              ))
            : ''}
        </div>
      </div>

      <Modal
        opened={modalData.status}
        centered
        title={modalData.data ? 'Update your address' : 'Add a new address'}
        onClose={() => setModalData({ status: false, data: null })}
      >
        <AddressForm onClose={() => setModalData({ status: false, data: null })} />
      </Modal>
    </section>
  );
};

export default Addresses;
