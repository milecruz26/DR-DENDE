import { User, EstablishmentResponse } from "@/interfaces";

export function mapEstablishmentToUser(data: EstablishmentResponse): User {
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    user_type: "establishment",
    address: data.address ?? null,
    role: null,
  };
}
