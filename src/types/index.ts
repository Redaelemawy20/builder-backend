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
  credential?: Cerdential & {
    user: User;
    role: Role & {
      permissions: (RolePermission & {
        permission: Permission;
      })[];
    };
  };
  user?: User;
  role?: Role;
}

export interface UserWithRelations extends User {
  entity?: Entity;
  credential?: Cerdential & {
    role?: Role;
  };
}

export interface EntityWithRelations extends Entity {
  pages: Page[];
  news: News[];
  staff: User[];
  layoutItem: Layout[];
}

export interface PageWithRelations extends Page {
  entity: Entity;
  sections: (PageSections & {
    section: Section;
  })[];
}

export interface SectionWithRelations extends Section {
  pages: (PageSections & {
    page: Page;
  })[];
  layouts: Layout[];
}

export interface NewsWithRelations extends News {
  entity: Entity;
}
