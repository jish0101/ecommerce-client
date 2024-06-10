import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Check, XCircle } from 'lucide-react';
import { Button, Flex, Input } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { notifications } from '@mantine/notifications';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';

// Define the form fields
const allFields = [
  { name: 'street', placeholder: 'Street' },
  { name: 'city', placeholder: 'City' },
  { name: 'state', placeholder: 'State' },
  { name: 'country', placeholder: 'Country' },
  { name: 'code', placeholder: 'Postal Code' },
];

// Create the validation schema explicitly
const createSchema = Yup.object().shape({
  street: Yup.string().required('This is required*'),
  city: Yup.string().required('This is required*'),
  state: Yup.string().required('This is required*'),
  country: Yup.string().required('This is required*'),
  code: Yup.string().required('This is required*'),
});

const AddressForm = ({ data, refetch, onClose }) => {
  const axios = useAxiosPrivate();
  const { mutateAsync: handleAddress, isPending } = useMutation({
    mutationFn: data ? updateAddress : createAddress,
    mutationKey: ['address'],
  });

  const {
    register,
    reset,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      street: '',
      city: '',
      state: '',
      country: '',
      code: '',
    },
    resolver: yupResolver(createSchema),
  });

  async function createAddress({ body }) {
    try {
      const { data, status } = await axios.post('/address', body);
      if (status === 200) {
        return data;
      }
    } catch (error) {
      return error;
    }
  }

  async function updateAddress({ body }) {
    try {
      const { data: someData, status } = await axios.put('/address', { ...body, _id: data._id });
      if (status === 200) {
        return someData;
      }
    } catch (error) {
      return error;
    }
  }

  const onSubmit = async (body) => {
    try {
      if (isPending) return;
      const { status, message } = await handleAddress({ body });
      if (status) {
        refetch();
        notifications.show({
          id: 'address',
          withCloseButton: true,
          autoClose: 2000,
          title: <h4 className="font-bold text-lg">Success</h4>,
          message: <p className="text-base">{message}</p>,
          color: 'yellow',
          withBorder: true,
          radius: 'lg',
          icon: <Check size={40} className="p-1" key={'address'} />,
          loading: false,
        });
        onClose();
      }
    } catch (err) {
      const error = err?.response?.data;
      notifications.show({
        id: 'address',
        withCloseButton: true,
        autoClose: 2000,
        title: <h4 className="font-bold text-lg">Oops!</h4>,
        message: <p className="text-base">{error?.message}</p>,
        color: 'red',
        radius: 'lg',
        icon: <XCircle className="p-1" size={50} key={'address'} />,
        loading: false,
      });
    }
  };

  const selectedCountry = watch('country');

  useEffect(() => {
    if (data) {
      const { _id, userId, __v, isPrimary, ...rest } = data;
      reset(rest);
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid md:grid-cols-2 gap-3">
        {allFields.map((field) => (
          <Flex direction={'column'} gap={3} key={field.name}>
            <Input.Wrapper
              label={field.placeholder}
              error={errors[field.name] && errors[field.name].message}
            >
              {field.name === 'country' || field.name === 'state' ? (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: controllerField }) => (
                    <div className="flex flex-col">
                      {field.name === 'country' ? (
                        <CountryDropdown
                          classes="py-2 rounded-md px-3 bg-white border"
                          value={controllerField.value}
                          onChange={(val) => controllerField.onChange(val)}
                        />
                      ) : (
                        <RegionDropdown
                          classes="py-2 rounded-md px-3 bg-white border"
                          country={selectedCountry}
                          value={controllerField.value}
                          onChange={(val) => controllerField.onChange(val)}
                        />
                      )}
                    </div>
                  )}
                />
              ) : (
                <Input
                  id={field.name}
                  {...register(field.name)}
                  error={errors[field.name]}
                  placeholder={field.placeholder}
                />
              )}
            </Input.Wrapper>
          </Flex>
        ))}
      </div>
      <div className="flex justify-center items-center my-3">
        <Button disabled={isPending} type="submit">
          {isPending ? 'Loading..' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
