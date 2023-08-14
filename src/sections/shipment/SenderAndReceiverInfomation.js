import { EditOutlined, RightOutlined } from '@ant-design/icons';
import { Box, Button, Divider, Grid, InputLabel, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { AutoCompleteField, CountryField, SelectField } from 'components/formField';
import GoogleMaps from 'components/formField/GoogleMap';
import { InputField } from 'components/formField/InputField';
import { useServices } from 'hooks/services/useGetServices';
import { useAuthentication } from 'hooks/useAuthentication';
import { useGetAllUSer } from 'hooks/user/useGetAllUser';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { AddressModal } from 'sections/shipment';
import { countriesList } from 'utils';

export function SenderAndReceiverInfomation({
  step,
  formValues,
  setFormValues,
  setStep,
  editData,
  edit,
  control,
  handleSubmit,
  setValue,
  watch,
  manifestId
}) {
  const [openModal, setOpenModal] = useState(false);
  const [hasSubmit, setHasSubmit] = useState(false);

  const { serviceList } = useServices();
  const { data: listUser } = useGetAllUSer();
  const { userCurrentInfo } = useAuthentication();

  const roleAdmin = userCurrentInfo?.role === 'RL1' || userCurrentInfo?.role === 'RL2';

  const optionListUser = useMemo(() => {
    return listUser?.map((user) => ({ value: user?.uuid, label: user?.name }));
  }, [listUser]);

  const optionsType = [
    { value: '', label: 'Select Type' },
    { value: 'WPX', label: 'WPX' },
    { value: 'DOC', label: 'DOC' }
  ];

  const optionsService = useMemo(() => {
    const list = [{ value: '', label: 'Select Service' }];
    serviceList?.forEach((item) => {
      list.push({ value: item.uuid, label: item.description });
    });
    return list;
  }, [serviceList]);

  const optionLocalCode = [
    { value: '', label: 'Select LocalCode' },
    { value: 'ups', label: 'UPS' },
    { value: 'dhl', label: 'DHL' },
    { value: 'fedex', label: 'FEDEX' },
    { value: 'vn-post', label: 'EMS Vietnam' },
    { value: 'kerrytj', label: 'Kerry Taiwan' },
    { value: 'taqbin-jp', label: 'Yamato JP' },
    { value: 'cj-logistics', label: 'CJ Logistics KR' },
    { value: 'gd-express', label: 'GDEX Malaysia' },
    { value: 'sf-international', label: 'SF CHINA' },
    { value: 'dpd-de', label: 'DPD Germany' },
    { value: 'purolator', label: 'Purolator' },
    { value: 'au-post', label: 'Australia Post' },
    { value: 'sagawa-jp', label: 'Sagawa Japan' },
    { value: 'cdek-ru', label: 'CDEK Russia' }
  ];

  const optionStatus = [
    { value: '', label: 'Select status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_transit', label: 'Transit' },
    { value: 'failed_attempt', label: 'Failed' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancel', label: 'Cancel ' }
  ];

  const optionsReason = [
    { value: '', label: 'Select Reason' },
    { value: 'gift', label: 'Gift' },
    { value: 'sample', label: 'Sample' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'personal', label: 'Personal, Not for Resale' },
    { value: 'return', label: 'Return for Repair' },
    { value: 'other', label: 'Other' }
  ];

  const optionsContent = [
    { value: '', label: 'Select Content' },
    { value: 'passport', label: 'Pasaport' },
    { value: 'id', label: 'ID ' },
    { value: 'billlading', label: 'Bill lading  ' },
    { value: 'contract', label: 'Contract ' }
  ];

  const { fields: senderInfoFields } = useFieldArray({
    control,
    name: 'senderInfo'
  });

  const { fields: receiverInfoFields } = useFieldArray({
    control,
    name: 'receiverInfo'
  });

  const watchShipmentType = watch('shipment_type');

  const countrySender = countriesList.find((item) => item.code === editData?.sender_address?.country);
  const countryReceiver = countriesList.find((item) => item.code === editData?.receiver_address?.country);
  const customer = optionListUser?.find((item) => item?.value === editData?.created_for);

  useEffect(() => {
    if (
      !hasSubmit &&
      editData &&
      formValues?.generalInfo?.senderInfo?.length === 0 &&
      formValues?.generalInfo?.receiverInfo?.length === 0
    ) {
      setValue('shipment_type', editData?.shipment_type);
      setValue('reason_export', editData?.reason_export);
      setValue('shipment_content', editData?.reason_export);
      setValue('service_id', editData?.service_id);
      setValue('status', editData?.status);

      if (roleAdmin) setValue('created_for_rl1', customer);

      setValue('manifestId', manifestId);
      setValue('localcode', editData?.localcode);
      setValue('localtracking', editData?.localtracking);

      setValue('senderInfo', [
        {
          name: editData?.sender_address?.name,
          company: editData?.sender_address?.company,
          phone: editData?.sender_address?.phone,
          email: editData?.sender_address?.email,
          country: countrySender,

          address_first: editData?.sender_address?.address_first,
          address_second: editData?.sender_address?.address_second,
          city: editData?.sender_address?.city,
          state: editData?.sender_address?.state,
          zipcode: editData?.sender_address?.zipcode
        }
      ]);

      setValue('receiverInfo', [
        {
          name: editData?.receiver_address?.name,
          company: editData?.receiver_address?.company,
          phone: editData?.receiver_address?.phone,
          email: editData?.receiver_address?.email,
          country: countryReceiver,

          address_first: editData?.receiver_address?.address_first,
          address_second: editData?.receiver_address?.address_second,
          city: editData?.receiver_address?.city,
          state: editData?.receiver_address?.state,
          zipcode: editData?.receiver_address?.zipcode
        }
      ]);
    }

    if (!roleAdmin) setValue('created_for_rl3', userCurrentInfo.name);
  }, [editData, countrySender, countryReceiver, hasSubmit, setValue, formValues, manifestId, roleAdmin, customer, userCurrentInfo]);

  const onSubmit = (data) => {
    setStep(step + 1);
    setFormValues({ ...formValues, generalInfo: data });
    setHasSubmit(true);
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <MainCard boxShadow={true}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Stack spacing={1}>
                <InputLabel>Shipment Type</InputLabel>
                <SelectField control={control} name={`shipment_type`} options={optionsType} helperText={true} />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Stack spacing={1}>
                <InputLabel>Service</InputLabel>
                <SelectField control={control} name={`service_id`} options={optionsService} helperText={true} />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              {watchShipmentType === 'DOC' && (
                <Stack spacing={1}>
                  <InputLabel>Content</InputLabel>
                  <SelectField control={control} name={`shipment_content`} options={optionsContent} helperText={true} />
                </Stack>
              )}

              {watchShipmentType !== 'DOC' && (
                <Stack spacing={1}>
                  <InputLabel>Reason export</InputLabel>
                  <SelectField control={control} name={`reason_export`} options={optionsReason} helperText={true} />
                </Stack>
              )}
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Stack spacing={1}>
                <InputLabel>Customer</InputLabel>

                {roleAdmin && (
                  <AutoCompleteField control={control} name={`created_for_rl1`} options={optionListUser} placeholder="Select customer" />
                )}
                {!roleAdmin && <InputField name={`created_for_rl3`} control={control} label="" disabled={true} />}
              </Stack>
            </Grid>

            {edit && (
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <Stack spacing={1}>
                    <InputLabel>Status</InputLabel>
                    <SelectField control={control} name={`status`} options={optionStatus} />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Stack spacing={1}>
                    <InputLabel>Local Code</InputLabel>
                    <SelectField control={control} name={`localcode`} options={optionLocalCode} />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Stack spacing={1}>
                    <InputLabel>Local Tracking</InputLabel>
                    <InputField name={`localtracking`} control={control} />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Stack spacing={1}>
                    <InputLabel>Manifest Id</InputLabel>
                    <InputField name={`manifestId`} control={control} disabled={true} />
                  </Stack>
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={6}>
              <MainCard>
                <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h5">Sender Infomation</Typography>
                  <Box textAlign={{ xs: 'left', sm: 'right' }} color="grey.200">
                    <Button
                      variant="outlined"
                      startIcon={<EditOutlined />}
                      color="secondary"
                      onClick={() => setOpenModal(true)}
                      size="small"
                    >
                      AddressBook
                    </Button>
                    <AddressModal
                      open={openModal}
                      setOpen={() => setOpenModal(false)}
                      // handlerAddress={() => setFieldValue('cashierInfo', address)}
                    />
                  </Box>
                </Stack>

                <Divider sx={{ margin: '0 -20px' }}></Divider>

                {senderInfoFields.map((item, index) => (
                  <Grid container rowSpacing={2} columnSpacing={2} key={item.id}>
                    <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                      <InputField name={`senderInfo.${index}.name`} control={control} label="Full name" />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                      <InputField name={`senderInfo.${index}.company`} control={control} label="Company Name" />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InputField name={`senderInfo.${index}.phone`} control={control} label="Phone number" placeholder="###-###-####" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField name={`senderInfo.${index}.email`} control={control} label="Email" placeholder="you@example.com" />
                    </Grid>
                    <Grid item xs={12} mt={1}>
                      <CountryField control={control} name={`senderInfo.${index}.country`} />
                    </Grid>
                    <Grid item xs={12}>
                      <GoogleMaps
                        control={control}
                        name={`senderInfo.${index}.address_first`}
                        setValue={setValue}
                        index={index}
                        sender={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField name={`senderInfo.${index}.address_second`} control={control} label="Address line 2(optional)" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField name={`senderInfo.${index}.city`} control={control} label="city" />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InputField name={`senderInfo.${index}.state`} control={control} label="state" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField name={`senderInfo.${index}.zipcode`} control={control} label="Postal code/ZipCode" />
                    </Grid>
                  </Grid>
                ))}
              </MainCard>
            </Grid>

            <Grid item xs={12} sm={6}>
              <MainCard>
                <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h5">Receiver Infomation</Typography>
                  <Box textAlign={{ xs: 'left', sm: 'right' }} color="grey.200">
                    <Button
                      variant="outlined"
                      startIcon={<EditOutlined />}
                      color="secondary"
                      onClick={() => setOpenModal(true)}
                      size="small"
                    >
                      AddressBook
                    </Button>
                    <AddressModal
                      open={openModal}
                      setOpen={() => setOpenModal(false)}
                      // handlerAddress={() => setFieldValue('cashierInfo', address)}
                    />
                  </Box>
                </Stack>

                <Divider sx={{ margin: '0 -20px' }}></Divider>

                {receiverInfoFields.map((item, index) => (
                  <Grid container rowSpacing={2} columnSpacing={2} key={item.id}>
                    <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                      <InputField name={`receiverInfo.${index}.name`} control={control} label="Full name" />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                      <InputField name={`receiverInfo.${index}.company`} control={control} label="Company Name" />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InputField name={`receiverInfo.${index}.phone`} control={control} label="Phone number" placeholder="###-###-####" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField name={`receiverInfo.${index}.email`} control={control} label="Email" placeholder="you@example.com" />
                    </Grid>
                    <Grid item xs={12} mt={1}>
                      <CountryField control={control} name={`receiverInfo.${index}.country`} />
                    </Grid>
                    <Grid item xs={12}>
                      <GoogleMaps
                        control={control}
                        name={`receiverInfo.${index}.address_first`}
                        setValue={setValue}
                        index={index}
                        sender={false}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField name={`receiverInfo.${index}.address_second`} control={control} label="Address line 2(optional)" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField name={`receiverInfo.${index}.city`} control={control} label="City" />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InputField name={`receiverInfo.${index}.state`} control={control} label="State" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField name={`receiverInfo.${index}.zipcode`} control={control} label="Postal code/ZipCode" />
                    </Grid>
                  </Grid>
                ))}
              </MainCard>
            </Grid>
          </Grid>
        </MainCard>
        {!edit && (
          <Stack direction="row" justifyContent={edit ? 'end' : 'center'} alignItems="center" mt={2}>
            <Button variant="contained" endIcon={<RightOutlined />} sx={{ width: '200p' }} type="submit">
              <Typography variant="h6" color="white">
                Next
              </Typography>
            </Button>
          </Stack>
        )}

        {edit && (
          <Stack direction="row" justifyContent={edit ? 'end' : 'center'} alignItems="center" mt={2}>
            <Button variant="contained" endIcon={<RightOutlined />} sx={{ width: '200p' }} type="submit">
              <Typography variant="h6" color="white">
                Next
              </Typography>
            </Button>
          </Stack>
        )}
      </form>
    </>
  );
}

SenderAndReceiverInfomation.propTypes = {
  setStep: PropTypes.func,
  step: PropTypes.number,
  setFormValues: PropTypes.func,
  formValues: PropTypes.object,
  editData: PropTypes.object,
  edit: PropTypes.bool,
  control: PropTypes.any,
  setValue: PropTypes.func,
  handleSubmit: PropTypes.func,
  watch: PropTypes.any,
  manifestId: PropTypes.string
};
