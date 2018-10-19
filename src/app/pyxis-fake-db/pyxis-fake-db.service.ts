import { InMemoryDbService } from 'angular-in-memory-web-api';

import { MembersFakeDb } from './members';

export class PyxisFakeDbService implements InMemoryDbService {
  createDb() {
    return {
      'members-members': MembersFakeDb.members,
    };
  }
}
