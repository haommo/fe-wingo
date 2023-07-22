/* eslint-disable no-undef */
import {
  AimOutlined,
  CalendarOutlined,
  EditFilled,
  EnvironmentOutlined,
  HomeOutlined,
  PhoneOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Box, Grid, Stack, Typography } from '@mui/material';
import ProfileBanner from 'assets/images/profile-banner.png';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import Avatar from 'assets/images/logo-wingo.png';
import IconButton from 'components/@extended/IconButton';
import { useState } from 'react';
import AddUserDialog from 'sections/user/AddUserDialog';
import { useGetCurrentUser } from 'hooks/user/useGetCurrentUser';
import Loadable from 'components/Loadable';

export default function ProfileUser() {
  const { data: currentUser, isLoading } = useGetCurrentUser();
  const [open, setOpen] = useState(false);

  const onEdit = () => {
    setOpen(true);
  };

  return (
    <>
      {isLoading && <Loadable />}
      {!isLoading && (
        <Stack spacing={3}>
          <MainCard boxShadow={true}>
            <Box>
              <Box
                sx={{
                  '& >img': {
                    objectFit: 'cover',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    width: '100%',
                    display: 'block',
                    height: '25vh'
                  }
                }}
              >
                <img src={ProfileBanner} alt="profile-banner" />
              </Box>
            </Box>
            <Stack direction="row" spacing={4} sx={{ marginTop: '-30px' }} px={3}>
              <Box
                sx={{
                  minWidth: '120px',
                  maxWidth: '120px',
                  height: '123px',
                  borderRadius: '6px',
                  border: '3px solid #e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'white',
                  '& > img': {
                    borderRadius: '6px',

                    display: 'block'
                  }
                }}
              >
                <img src={currentUser?.image ? `${process.env.REACT_APP_API_URL}${currentUser?.image}` : Avatar} alt="" width="116px" />
              </Box>
              <Stack direction="column" justifyContent="end" spacing={1}>
                <Typography variant="h3" color="secondary">
                  {currentUser?.name}
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                  <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <CalendarOutlined style={{ fontSize: '16px' }} />
                    <Typography variant="h6" color="secondary">
                      Joined {dayjs(currentUser?.created_at).format('YYYY-MM-DD')}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0} justifyContent="center" alignItems="center">
                    <Typography variant="h6" color="secondary">
                      Edit
                    </Typography>
                    <IconButton onClick={onEdit} color="error" mx={0} px={0}>
                      <EditFilled style={{ fontSize: '16px' }} />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </MainCard>

          <MainCard boxShadow={true}>
            <Grid container spacing={3} px={7} py={2}>
              <Grid item xs={12} md={6}>
                <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                  <UserOutlined />
                  <Typography color="secondary">Full Name</Typography>
                  <Typography>{currentUser?.name}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                  <HomeOutlined />
                  <Typography color="secondary">Company Name</Typography>
                  <Typography>{currentUser?.company}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                  <HomeOutlined />
                  <Typography color="secondary">email</Typography>
                  <Typography>{currentUser?.email}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                  <PhoneOutlined />
                  <Typography color="secondary">Phone</Typography>
                  <Typography>{currentUser?.number}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                  <EnvironmentOutlined />
                  <Typography color="secondary">Address</Typography>
                  <Typography>{currentUser?.address}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                  <EnvironmentOutlined />
                  <Typography color="secondary">Country</Typography>
                  <Typography>{currentUser?.country}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                  <EnvironmentOutlined />
                  <Typography color="secondary">city</Typography>
                  <Typography>{currentUser?.city}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                  <EnvironmentOutlined />
                  <Typography color="secondary">state</Typography>
                  <Typography>{currentUser?.state}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                  <EnvironmentOutlined />
                  <Typography color="secondary">zipcode</Typography>
                  <Typography>{currentUser?.email}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                  <AimOutlined />
                  <Typography color="secondary">role</Typography>
                  <Typography>{currentUser?.email}</Typography>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
          <AddUserDialog open={open} setOpen={setOpen} data={currentUser} isEditProfile={true} />
        </Stack>
      )}
    </>
  );
}
