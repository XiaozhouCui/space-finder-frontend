import { ICreateSpaceState } from '../components/spaces/CreateSpace';
import { Space } from '../model/Model';

export class DataService {
  public async createSpace(iCreateSpace: ICreateSpaceState) {
    return '123';
  }

  public async getSpapces(): Promise<Space[]> {
    const result: Space[] = [];

    result.push({
      location: 'Paris',
      name: 'Best Location',
      spaceId: '123',
    });
    result.push({
      location: 'London',
      name: 'Best Location',
      spaceId: '124',
    });
    result.push({
      location: 'Tokyo',
      name: 'Best Location',
      spaceId: '125',
    });

    return result;
  }

  public async reserveSpace(spaceId: string): Promise<string | undefined> {
    if (spaceId === '123') {
      return '5555';
    }
    return undefined;
  }
}
