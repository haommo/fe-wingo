export const getLabelShipment = (status) => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'in_transit':
      return 'Transit';
    case 'delivered':
      return 'Delivered';
    case 'cancel':
      return 'Cancel';
    default:
      return '-';
  }
};

export const getLabelManifest = (status) => {
  switch (status) {
    case '1':
      return 'Booked';
    case '2':
      return 'Departed';
    case '3':
      return 'Arrived';
    case '4':
      return 'Received';
    case '5':
      return 'Notified';
    case '6':
      return 'Delivered';
    default:
      return '-';
  }
};

export const getLabelTypeAddress = (status) => {
  switch (status) {
    case '1':
      return 'Sender';
    case '2':
      return 'Receiver';

    default:
      return '-';
  }
};

export const getLabelStatusUser = (status) => {
  switch (status) {
    case 1:
      return 'Active';
    case 2:
      return 'Inactive';

    default:
      return '-';
  }
};

export const getLabelRole = (role) => {
  switch (role) {
    case 'RL1':
      return 'Admin';
    case 'RL2':
      return 'Manager';
    case 'RL3':
      return 'Customer';
    case 'RL4':
      return 'Sale Wingo';
    default:
      return '-';
  }
};
