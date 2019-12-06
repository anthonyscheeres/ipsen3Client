export class UserModel {
  user_id: number;
  username: string;
  password: string;
  email: string;
  has_read: boolean;
  has_write: boolean;
  has_delete: boolean;
  is_super_user: boolean;
  token: string;
}
