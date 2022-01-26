import { Space } from '../model/Model';

export class DataService {
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
}
