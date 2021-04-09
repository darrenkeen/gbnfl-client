const PLATFORM_TYPE = {
  battle: 'PC',
  xbl: 'Xbox',
  psn: 'PlayStation',
};

export const getPlatformType = (platformType: string) =>
  PLATFORM_TYPE[platformType];
