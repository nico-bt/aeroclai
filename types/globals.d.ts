export {};

// Create a type for the roles
export type Roles = "realtor" | "tenant" | "admin";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
