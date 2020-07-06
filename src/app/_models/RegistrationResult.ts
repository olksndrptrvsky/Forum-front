export class RegistrationResult {
  succeeded: boolean;
  errors: { code: string, description: string }[];
}
