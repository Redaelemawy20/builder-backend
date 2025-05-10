import { Request } from 'express';
import {
  User,
  Cerdential,
  Role,
  Permission,
  RolePermission,
  Entity,
  Page,
  Section,
  Layout,
  PageSections,
  News,
} from '@prisma/client';

export type SectionType = 'nav' | 'footer' | 'news' | 'section' | 'persons';

export interface AuthenticatedRequest extends Request {
  credential?: any;
  user?: User;
  role?: any;
  file?: Express.Multer.File;
}

export interface UserWithRelations extends User {
  entity?: Entity;
  credential?: any;
}

export interface EntityWithRelations extends Entity {
  pages: Page[];
  news: News[];
  staff: User[];
  layoutItem: any[];
}

export interface PageWithRelations extends Page {
  entity: Entity;
  sections: any[];
}

export interface SectionWithRelations extends Section {
  pages: any[];
  layouts: any[];
}

export interface NewsWithRelations extends News {
  entity: Entity;
}
