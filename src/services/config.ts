// this api endpoint can be found in CloudFormation > Stacks > SpaceFinder > Outputs (tab)
const spacesUrl =
  'https://srqcwkm2nd.execute-api.ap-southeast-2.amazonaws.com/prod/';

export const config = {
  REGION: 'ap-southeast-2',
  USER_POOL_ID: 'ap-southeast-2_NX7tExP4e',
  APP_CLIENT_ID: '2vlc9u75nen5sr9q4qhrqr6url',
  IDENTITY_POOL_ID: 'ap-southeast-2:c6484e5d-b3b5-485a-b60b-5fc8aa94e7c7',
  TEST_USER_NAME: 'joe.cui.2',
  TEST_USER_PASSWORD: 'g98yad0Thj#la5',
  SPACES_PHOTOS_BUCKET: 'spaces-photos-067730fda8cc',
  PROFILE_PHOTOS_BUCKET: 'profile-photos-067730fda8cc',
  api: {
    baseUrl: spacesUrl,
    spacesUrl: `${spacesUrl}spaces`,
    reservationsUrl: `${spacesUrl}reservations/`,
  },
};
