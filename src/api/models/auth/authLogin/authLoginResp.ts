export interface AuthLoginResp {
  data: AuthLogin;
}

export interface AuthLogin {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  organizations: Organization[];
  individual: Organization;
  accessToken: string;
  idToken: string;
  isFilledInfo: boolean;
  isConsent: boolean;
  country: string;
  isChirpAiConsent: boolean;
  defaultDisplayName: string;
}

interface Organization {
  userDisplayName: string;
  orgId: string;
  package: string;
  orgName: string;
  roles: string[];
  packageCode: number;
  endDate: number;
  studentConcurrent: number;
}
