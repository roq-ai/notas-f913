import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ProfessorInterface {
  id?: string;
  user_id?: string;
  activity: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ProfessorGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  activity?: string;
}
