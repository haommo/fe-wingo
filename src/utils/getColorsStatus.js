export const getColorStatus = (status) => {
  switch (status) {
    case 'PENDING':
      return 'warning';
    case 'pending':
      return 'warning';
    case 'in_transit':
      return 'primary';
    case 'TRANSIT':
      return 'primary';
    case 'CANCEL':
      return 'error';
    case 'cancel':
      return 'error';
    case 'DELIVERED':
      return 'success';
    case 'delivered':
      return 'success';
    case 'RETURN':
      return 'error';
    case 'DRAF':
      return 'secondary';
    case 'PICKUP':
      return 'info';
    case 'ALL':
      return 'primary';
    default:
      return 'secondary';
  }
};

export const getColorStatusManifest = (status) => {
  switch (status) {
    case 'booking':
      return 'warning';
    case 'departed ':
      return 'primary';
    case 'arrived':
      return 'success';
    default:
      return 'primary';
  }
};

export const getColorTypeAddress = (status) => {
  switch (status) {
    case 'sender':
      return 'info';

    case 'receiver':
      return 'success';

    default:
      return 'secondary';
  }
};

export const getColorStatusUser = (status) => {
  switch (status) {
    case 1:
      return 'success';
    case 2:
      return 'error';
    default:
      return 'secondary';
  }
};
