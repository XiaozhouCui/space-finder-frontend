import { ICreateSpaceState } from '../components/spaces/CreateSpace';
import { Space } from '../model/Model';
import { S3, config } from 'aws-sdk';
import { config as appConfig } from './config';

config.update({
  region: appConfig.REGION,
});

export class DataService {
  public async createSpace(iCreateSpace: ICreateSpaceState) {
    if (iCreateSpace.photo) {
      const photoUrl = await this.uploadPublicFile(
        iCreateSpace.photo,
        appConfig.SPACES_PHOTOS_BUCKET
      );
      console.log(photoUrl);
    }
    return '123';
  }

  private async uploadPublicFile(file: File, bucket: string) {
    const fileName = file.name;
    const uploadResult = await new S3({ region: appConfig.REGION })
      .upload({
        Bucket: bucket,
        Key: fileName,
        Body: file,
        ACL: 'public-read', // everyone can see the file on Internet
      })
      .promise();
    return uploadResult.Location;
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
