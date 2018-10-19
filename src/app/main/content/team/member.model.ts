import { PyxisUtils } from '@pyxis/utils';

export class Member {

  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  position: string;

  constructor(member) {
    this._id = member._id || PyxisUtils.generateGUID();
    this.firstName = member.firstName || '';
    this.lastName = member.lastName || '';
    this.avatar = member.avatar || 'assets/images/avatars/profile.jpg';
    this.position = member.position || '';
  }

}
