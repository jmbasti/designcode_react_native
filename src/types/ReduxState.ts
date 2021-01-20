export interface RootState {
  menu: { isOpen: boolean };
  card: { isOpen: boolean };
  notification: { isOpen: boolean };
  image: { photo: string };
  name: { name: string; updatedName: string };
  login: { isOpen: boolean };
}
